export const handleRecipeDataStructure = (data) => data[0];

export const handleRecommendationDataStructure = (data) => {
  const maxRecipes = 6;
  const limittedData = data.slice(0, maxRecipes);
  return limittedData;
};
