import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import RecipeDetails from '../pages/RecipeDetails';
import RecipeDetails2 from '../pages/RecipeDetails2';
import RecipeInProgress from '../pages/RecipeInProgress';
import Recipes from '../pages/Recipes';

function Routes() {
  return (
    <div>
      <Switch>
        {/* As rotas a baixo foram as primeiras que desenvolvemos */}
        <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/foods/:id" component={ RecipeDetails2 } />
        <Route exact path="/drinks/:id" component={ RecipeDetails2 } />
        <Route
          path="/foods"
          render={ (props) => <Recipes { ...props } key={ window.location.pathname } /> }
        />
        <Route
          path="/drinks"
          render={ (props) => <Recipes { ...props } key={ window.location.pathname } /> }
        />
        <Route path="/recipes" component={ Recipes } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />

        {/* As rotas a baixo tem o path exigido pelo projeto */}

        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default Routes;
