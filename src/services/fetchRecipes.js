export const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const flattedData = data?.meals || data?.drinks;
  return flattedData;
};

export const multipleFetchData = async (collection) => {
  const allData = await Promise.all(
    collection.map(({ url }) => fetchData(url)),
  );

  collection.forEach(({ setter, dataHandler }, i) => {
    const data = allData[i];
    const processedData = dataHandler(data);
    setter(processedData);
  });
};
