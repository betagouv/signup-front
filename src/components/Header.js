import React from 'react';
import PropTypes from 'prop-types';
import { withUser } from './UserContext';

const Header = ({ user, logout }) => {
  const displayContactLink =
    window.location.pathname === '/' ||
    window.location.pathname === '/stats' ||
    window.location.pathname.startsWith('/public');

  return (
    <header className="navbar">
      <div className="navbar__container">
        <a className="navbar__home" href="https://api.gouv.fr/?filter=signup">
          <img
            className="navbar__logo"
            src="/images/logo_api.svg"
            alt="Accueil de signup.api.gouv.fr"
          />
        </a>

        <nav>
          <ul className="nav__links">
            <li className="nav__item">
              <a href="https://api.gouv.fr/apropos">À propos</a>
            </li>
            {displayContactLink && (
              <li className="nav__item">
                <a href="mailto:contact@particulier.api.gouv.fr?subject=Contact%20via%20signup.api.gouv.fr">
                  Nous contacter
                </a>
              </li>
            )}
            {user && (
              <li className="nav__item">
                <div className="dropdown">
                  {user.email}
                  <div className="dropdown-content" style={{ top: '1.8em' }}>
                    <a onClick={logout} href="#logout">
                      Se déconnecter
                    </a>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: null,
};

export default withUser(Header);
