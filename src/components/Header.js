import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { withUser } from './UserContext';
import ArrowBackIcon from './icons/arrowBack';

const Header = ({ user, logout }) => {
  const isOnDetailPage =
    window.location.pathname.startsWith('/api-particulier') ||
    window.location.pathname.startsWith('/api-entreprise') ||
    window.location.pathname.startsWith('/franceconnect') ||
    window.location.pathname.startsWith('/api-droits-cnam') ||
    window.location.pathname.startsWith('/preuve-covoiturage') ||
    window.location.pathname.startsWith('/dgfip');

  return (
    <header className="navbar">
      <div className="navbar__container">
        {isOnDetailPage ? (
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              fontSize: '1.5em',
              margin: '0.11em 0',
            }}
          >
            <span style={{ verticalAlign: 'middle' }}>
              <ArrowBackIcon />
            </span>
            Retour
          </Link>
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
            {!isOnDetailPage && (
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
