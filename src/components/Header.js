import {Link} from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import {withUser} from "./UserContext";

const Header = ({user, logout}) => (
  <header className='navbar'>
    <div className='navbar__container'>
      <a className='navbar__home' href='https://api.gouv.fr/'>
        <img className='navbar__logo' src='/images/logo_api.svg' alt='Accueil de signup.api.gouv.fr' />
      </a>
      <nav>
        <ul className='nav__links'>
          {user && (
            <React.Fragment>
              <li className='nav__item'><Link to='/'>Liste des demandes</Link></li>
              <li className='nav__item'>
                <div className='dropdown'>
                  { user.email }
                  <div className='dropdown-content' style={{top: '1.8em'}}>
                    <a onClick={logout}>Se déconnecter</a>
                  </div>
                </div>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired
}

Header.defaultProps = {
  user: null
}

export default withUser(Header)
