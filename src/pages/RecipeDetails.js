import React, { useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import RecommendationCard from '../components/RecommendationCard';
import { addToLocalStorage, createLocalStorage, getLocalStorage,
  removeFavoriteRecipe } from '../helpers/localStorage';
import styles from './RecipeDetails.module.css';
import { multipleFetchData } from '../services/fetchRecipes';
import { handleRecipeEndpoint, handleRecommendationEndpoint } from '../helpers/endpoints';
import { handleRecipeDataStructure, handleRecommendationDataStructure } from '../helpers/dataStructures';
import { isAlreadyDoneOnLoad, isAlreadyInProgressOnLoad, isFavoriteOnLoad } from '../helpers/recipeDetailsHelpers';

const RecipeDetails = () => {
  const { url, params: { id } } = useRouteMatch();
  const { push, location: { pathname } } = useHistory();
  const teste = useHistory();
  console.log(teste);

  const [recipeData, setRecipeData] = useState([]);
  const [recommendationData, setRecommendationData] = useState([]);

  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRecipeAlreadyDone, setIsRecipeAlreadyDone] = useState(false);
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);

  const { 
    strMeal,
    strDrink,
    strMealThumb,
    strDrinkThumb,
    strCategory: category,
    strInstructions: instructions,
    strYoutube: youtubeUrl,
    strAlcoholic,
    strArea } = recipeData;

  const isMeal = url.includes('food');
  const name = strMeal || strDrink;
  const image = strMealThumb || strDrinkThumb;
  const type = url.includes('food') ? 'food' : 'drink';
  const subcategory = isMeal ? category : strAlcoholic;
  const alcoholicOrNot = strAlcoholic || '';
  const nationality = strArea || '';

  // onMount Functions
  useEffect(() => {
    multipleFetchData(
      [
        {
          url: handleRecipeEndpoint(id, isMeal),
          dataHandler: handleRecipeDataStructure,
          setter: setRecipeData,
        },
        {
          url: handleRecommendationEndpoint(isMeal),
          dataHandler: handleRecommendationDataStructure,
          setter: setRecommendationData,
        },
      ],
    );

    isFavoriteOnLoad(setIsFavorite);
    isAlreadyDoneOnLoad(setIsRecipeAlreadyDone);
    isAlreadyInProgressOnLoad(setIsRecipeInProgress, isMeal, id);
  }, []);

  // render Functions

  const renderIngredients = () => {
    const ingredients = Object.keys(recipeData)
      .filter((ingredientItem) => ingredientItem.includes('strIngredient')
      && recipeData[ingredientItem]);
    const measures = Object.keys(recipeData)
      .filter((measureItem) => measureItem.includes('strMeasure'));

    const ingredientsArray = ingredients
      .map((ingredient, index) => {
        const ingredientStr = recipeData[ingredient];
        const measureStr = recipeData[measures[index]];
        return (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredientStr} - ${measureStr}`}
          </li>
        );
      });
    return <ul>{ingredientsArray}</ul>;
  };

  const renderRecommendationCards = () => recommendationData.map((itemData, index) => {
    const { idDrink, idMeal } = itemData;
    const key = idDrink || idMeal;
    return (
      <RecommendationCard
        key={ key }
        data={ itemData }
        index={ index }
      />
    );
  });

  // onClick Functions

  const onShareClick = () => {
    clipboardCopy(`${window.origin}${url}`);
    setIsCopied(true);
  };

  const onFavoriteClick = () => {
    const payload = { alcoholicOrNot, category, id, image, name, nationality, type };
    if (!isFavorite) {
      addToLocalStorage('favoriteRecipes', payload);
      setIsFavorite(true);
    }
    if (isFavorite) {
      removeFavoriteRecipe(id);
      setIsFavorite(false);
    }
  };

  const onStartRecipeClick = () => {
    const pathToPush = `${pathname}/in-progress`;
    push(pathToPush);
  };

  const isFetching = !recipeData || !recommendationData.length;

  if (isFetching) {
    return <span>Loading...</span>;
  }
  return (
    <main>
      <img
        src={ image }
        alt={ `${name} recipe` }
        data-testid="recipe-photo"
      />
      <button
        type="button"
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ onShareClick }
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        onClick={ onFavoriteClick }
      >
        <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="share-icon" />
      </button>
      { isCopied && <span>Link copied!</span> }
      <p data-testid="recipe-title">{name}</p>
      <p data-testid="recipe-category">{`${subcategory}`}</p>
      <h3>Ingredients</h3>
      { renderIngredients() }
      <h3>Instructions</h3>
      <p data-testid="instructions">{instructions}</p>
      { isMeal && (
        <>
          <h3>Video</h3>
          <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ `https://www.youtube.com/embed/${youtubeUrl}` }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
            picture-in-picture"
            allowFullScreen
          />
        </>
      ) }
      <h3> Recomendations </h3>
      <div className={ styles['recommendation-container'] }>
        { renderRecommendationCards() }
      </div>
      {!isRecipeAlreadyDone && (
        <button
          className={ styles['start-button'] }
          type="button"
          data-testid="start-recipe-btn"
          onClick={ onStartRecipeClick }
        >
          { isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe' }
        </button>
      )}
    </main>
  );
};

export default RecipeDetails;
