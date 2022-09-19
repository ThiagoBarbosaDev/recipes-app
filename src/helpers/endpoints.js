export const handleRecipeEndpoint = (id, isMeal) => {
  const foodRecipeEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drinkRecipeEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const recipeEndpoint = isMeal ? foodRecipeEndpoint : drinkRecipeEndpoint;
  return recipeEndpoint;
};

export const handleRecommendationEndpoint = (isMeal) => {
  const foodRecommendationEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const drinkRecommendationEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const recommendationEndpoint = isMeal
    ? foodRecommendationEndpoint
    : drinkRecommendationEndpoint;
  return recommendationEndpoint;
};
