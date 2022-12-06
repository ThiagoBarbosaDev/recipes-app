import { createLocalStorage, getLocalStorage } from './localStorage';

export const isFavoriteOnLoad = (setter) => {
  createLocalStorage('favoriteRecipes');
  const localStorageData = getLocalStorage('favoriteRecipes');
  const isAlreadyFavorite = localStorageData.some((item) => item.id === id);
  if (isAlreadyFavorite) { setter(true); }
};

export const isAlreadyDoneOnLoad = (setter) => {
  createLocalStorage('doneRecipes');
  const localStorageData = getLocalStorage('doneRecipes');
  const isAlreadyDone = localStorageData.some((item) => item.id === id);
  if (isAlreadyDone) { setter(true); }
};

export const isAlreadyInProgressOnLoad = (setter, isMeal, id) => {
  createLocalStorage('inProgressRecipes', {});
  const localStorageData = getLocalStorage('inProgressRecipes');
  if (localStorageData?.meals || localStorageData?.cocktails) {
    const idList = isMeal
      ? Object.keys(localStorageData?.meals)
      : Object.keys(localStorageData?.cocktails);
    const isAlreadyInProgress = idList.some((item) => item.includes(id));
    if (isAlreadyInProgress) { setter(true); }
  }
};
