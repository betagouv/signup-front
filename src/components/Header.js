import React from 'react';
import PropTypes from 'prop-types';
import { isObject } from 'lodash';
import { withRouter } from 'react-router-dom';
import { withUser } from './UserContext';
import ArrowBackIcon from './icons/arrowBack';
import './Header.css';

const Header = ({ user, logout, history }) => {
  const displayApiGouvIcon =
    window.location.pathname === '/' ||
    window.location.pathname === '/stats' ||
    window.location.pathname.startsWith('/public');

  const goBack = e => {
    if (isObject(history.location.state) && history.location.state.fromList) {
      return history.goBack();
    }

    return history.push('/');
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        {!displayApiGouvIcon ? (
          <button className="back-button" onClick={goBack}>
            <span style={{ verticalAlign: 'middle' }}>
              <ArrowBackIcon />
            </span>
            Retour
          </button>
        ) : (
          <a className="navbar__home" href="https://api.gouv.fr/?filter=signup">
            <img
              className="navbar__logo"
              src="/images/logo_api.svg"
              alt="Accueil de signup.api.gouv.fr"
            />
          </a>
        )}

        <nav>
          <ul className="nav__links">
            <li className="nav__item">
              <a href="https://api.gouv.fr/apropos">À propos</a>
            </li>
            {displayApiGouvIcon && (
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        fromList: PropTypes.bool,
      }),
    }),
  }),
};

Header.defaultProps = {
  user: null,
};

export default withRouter(withUser(Header));
