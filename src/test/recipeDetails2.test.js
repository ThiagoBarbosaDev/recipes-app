import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { createLocalStorage, getLocalStorage,
  setLocalStorage } from '../helpers/localStorage';
import doneDrink from './mocks/doneDrink';
import inProgressMock from './mocks/inProgressMock';

beforeEach(() => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(fetch);
});

const favoriteButtonStr = 'favorite-btn';

describe('Testa o componente Recipes', () => {
  it('Testa se a página de DoneRecipes renderiza corretamente', async () => {
    createLocalStorage('doneRecipes');
    setLocalStorage('doneRecipes', doneDrink);
    renderWithRouterAndRedux(<App />, undefined, '/drinks/15997');
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const favoriteButton = screen.getByTestId(favoriteButtonStr);
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(favoriteButton);
    const favoriteButtonAfterClick = screen.getByTestId(favoriteButtonStr);
    expect(favoriteButtonAfterClick).toHaveAttribute('src', blackHeartIcon);
    userEvent.click(favoriteButtonAfterClick);
  });
  it('Testa se a página de DoneRecipes renderiza corretamente', async () => {
    // localStorage.removeItem('doneRecipes');
    createLocalStorage('inProgressRecipes', { meals: {}, cocktails: {} });
    setLocalStorage('inProgressRecipes', inProgressMock);

    const { history } = renderWithRouterAndRedux(<App />, undefined, '/donerecipes');
    // history.push('/drinks/15997');
    screen.logTestingPlaygroundURL();
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    console.log(getLocalStorage('inProgressRecipe'));

    const startButton = screen.getByTestId('start-recipe-btn');
    expect(startButton).toHaveTextContent('Continue Recipe');
  });
});
