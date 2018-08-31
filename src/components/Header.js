import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { withUser } from './UserContext';
import ArrowBackIcon from './icons/arrowBack';

const Header = ({ user, logout }) => {
  const onDetailPage =
    window.location.pathname.includes('/api-particulier/') ||
    window.location.pathname.includes('/dgfip/');

  return (
    <header className="navbar">
      <div className="navbar__container">
        {onDetailPage ? (
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
          <a className="navbar__home" href="https://api.gouv.fr/">
            <img
              className="navbar__logo"
              src="/images/logo_api.svg"
              alt="Accueil de signup.api.gouv.fr"
            />
          </a>
        )}

        <nav>
          <ul className="nav__links">
            {user && (
              <li className="nav__item">
                <div className="dropdown">
                  {user.email}
                  <div className="dropdown-content" style={{ top: '1.8em' }}>
                    <a onClick={logout}>Se déconnecter</a>
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
