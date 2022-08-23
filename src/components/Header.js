import React from 'react';
import { useHistory } from 'react-router-dom';
import capitalizeFirstLetter from '../helpers/capitalizeFirstLetter';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const ICONLESS_PATHNAME = ['/profile', '/done-recipes', '/favorite-recipes'];

const Header = () => {
  const { location: { pathname } } = useHistory();
  const hasIcon = () => !ICONLESS_PATHNAME.some((path) => path === pathname);

  return (
    <div>
      <img
        src={ profileIcon }
        alt="profile-icon"
        data-testid="profile-top-btn"
      />

      <h2>{ capitalizeFirstLetter(pathname) }</h2>

      {
        hasIcon() ? (
          <img
            src={ searchIcon }
            alt="search-icon"
            datatest-id="search-top-btn"
          />
        ) : null
      }
    </div>
  );
};

export default Header;
