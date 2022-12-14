import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import capitalizeFirstLetter from '../helpers/capitalizeFirstLetter';
import { doneRoute, favDoneRoutes, favRoute } from '../helpers/headerRouteType';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const Header = () => {
  const { location: { pathname } } = useHistory();
  const history = useHistory();
  const [isToggle, setToggle] = useState(false);
  const redirectToProfile = () => {
    history.push('/profile');
  };
  const searchbarConditional = () => {
    const noSearchbarRoutes = ['/profile', '/done-recipes', '/favorite-recipes'];
    const noSearchbarRoutesSome = noSearchbarRoutes.some((e) => e === pathname);
    if (noSearchbarRoutesSome === true) {
      return true;
    }
  };
  const pathTitlesStrConvertOtherRoutes = (array) => {
    const pathTitlesStrConvertSomeOutherRoutes = array.some((e) => e === pathname);
    if (pathTitlesStrConvertSomeOutherRoutes === true) {
      return true;
    }
  };
  const pathTitlesStrConvertDoneFav = (array) => {
    const pathTitlesStrConvertSomeArray = array.some((e) => e === pathname);
    if (pathTitlesStrConvertSomeArray === true) {
      return true;
    }
  };
  return (
    <div>
      {/* PROFILE TOP BTN */}
      <button type="button" onClick={ redirectToProfile }>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="icon-profile" />
      </button>

      {
        pathTitlesStrConvertOtherRoutes(favDoneRoutes) ? null
          : (
            <h2 data-testid="page-title">
              { capitalizeFirstLetter(pathname) }
            </h2>
          )
      }

      {
        pathTitlesStrConvertDoneFav(doneRoute)
          ? (
            <h2 data-testid="page-title">
              Done Recipes
            </h2>
          ) : null
      }

      {
        pathTitlesStrConvertDoneFav(favRoute)
          ? (
            <h2 data-testid="page-title">
              Favorite Recipes
            </h2>
          )
          : null
      }
      {
        searchbarConditional()
          ? null
          : (
            <button
              src={ searchIcon }
              type="button"
              onClick={ () => setToggle(!isToggle) }
            >
              <img src={ searchIcon } alt="profile-icon" data-testid="search-top-btn" />
            </button>
          )
      }
      { isToggle
      && <SearchBar />}
    </div>
  );
};
export default Header;
