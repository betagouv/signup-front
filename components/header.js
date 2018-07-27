import Link from 'next/link'
import React from 'react'
import PropTypes from 'prop-types'

const Header = ({user, handleDisconnect}) => (
  <header className='navbar'>
    <div className='navbar__container'>
      <a className='navbar__home' href='https://api.gouv.fr/'>
        <img className='navbar__logo' src='https://api.gouv.fr/img/logo_api.svg' alt='Accueil de signup.api.gouv.fr' />
      </a>
      <nav>
        <ul className='nav__links'>
          {user && (
            <React.Fragment>
              <li className='nav__item'><Link href='/'><a>Liste des demandes</a></Link></li>
              <li className='nav__item'>
                <div className='dropdown'>
                  { user.email }
                  <div className='dropdown-content'>
                    <a onClick={handleDisconnect}>Se déconnecter</a>
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
  handleDisconnect: PropTypes.func.isRequired
}

Header.defaultProps = {
  user: null
}

export default Header
