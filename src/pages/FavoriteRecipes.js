import React, { useEffect, useState } from 'react';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import Header from '../components/Header';
import { getLocalStorage } from '../helpers/localStorage';

const FavoriteRecipes = () => {
  const [noFilter, setNoFilter] = useState([]);
  const [foodFilter, setFoodFilter] = useState([]);
  const [drinkFilter, setDrinkFilter] = useState([]);
  const [whichFilterToApply, setWhichFilterToApply] = useState('noFilter');

  useEffect(() => {
    const data = getLocalStorage('favoriteRecipes');
    setNoFilter(data);
  }, []);

  const handleNoFilter = () => {
    setFoodFilter(noFilter);
    setWhichFilterToApply('noFilter');
  };

  const handleFoodFilter = () => {
    const filteredByFood = noFilter.filter(({ type }) => type === 'food');
    setFoodFilter(filteredByFood);
    setWhichFilterToApply('food');
  };

  const handleDrinkFilter = () => {
    const filteredByDrink = noFilter.filter(({ type }) => type === 'drink');
    setDrinkFilter(filteredByDrink);
    setWhichFilterToApply('drink');
  };

  const dataToRender = {
    noFilter,
    food: foodFilter,
    drink: drinkFilter,
  };

  const renderFavoriteRecipeCards = () => (
    dataToRender[whichFilterToApply]?.map((recipeData, index) => (
      <FavoriteRecipeCard
        data={ recipeData }
        key={ recipeData.id }
        index={ index }
        filterData={ { setNoFilter, setFoodFilter, setDrinkFilter, whichFilterToApply } }
      />
    )));

  return (
    <div>
      <Header />
      <fieldset>
        <legend>Filtros</legend>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleNoFilter() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleFoodFilter() }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleDrinkFilter() }
        >
          Drink
        </button>
      </fieldset>
      <main>
        { renderFavoriteRecipeCards() }
      </main>
    </div>
  );
};

export default FavoriteRecipes;
