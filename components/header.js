import Link from 'next/link'
import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import OAuthClient from '../lib/oauth-client'
import User from '../lib/user'
import withUser from '../components/hoc/with-user'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)

    this.state = {
      user: props.user
    }
  }

  logout() {
    const {user} = this.state

    user.logout().then(loggedOutUser => {
      Router.push('/')
      this.setState({user: loggedOutUser})
    })
  }

  render() {
    const {user} = this.state

    return (
      <header className='navbar'>
        <div className='navbar__container'>
          <a className='navbar__home' href='https://api.gouv.fr/'>
            <img className='navbar__logo' src='https://api.gouv.fr/img/logo_api.svg' alt='Accueil de signup.api.gouv.fr' />
          </a>
          <nav>
            <ul className='nav__links'>
              {user.loggedIn &&
                <li className='nav__item'><Link href='/'><a>Liste des demandes</a></Link></li>
              }
              <li className='nav__item'>
                {user.loggedIn && (
                  <div className='dropdown'>
                    { user.email }
                    <div className='dropdown-content'>
                      <a onClick={this.logout}>Se déconnecter</a>
                    </div>
                  </div>
                )
                }
                {
                  !user.loggedIn && (
                    <a href={new OAuthClient().getAuthorizationUri()}>Se connecter</a>
                  )
                }
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  user: PropTypes.object
}

Header.defaultProps = {
  user: new User()
}

export default withUser(Header)
