import Link from 'next/link'
import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import OAuth from '../lib/oauth'
import User from '../lib/user'
import withUser from '../components/hoc/with-user'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.oauth = new OAuth()
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
      <header>
        <nav className='nav'>
          <div className='nav__container'>
            <a className='nav__link' href='/'>
              <img className='nav__logo' src='/static/images/logo-api-particulier.png' alt='Accueil de particulier.api.data.gouv.fr' />
            </a>
            <ul className='nav__links'>
              {user.loggedIn &&
                <li><Link href='/demandes'><a>Liste des demandes</a></Link></li>
              }
              <li><Link href='/#france-connect'><a>Données disponibles</a></Link></li>
              <li>
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
                    <a href={this.oauth.client.token.getUri()}>Se connecter</a>
                  )
                }
              </li>
            </ul>
          </div>
        </nav>
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
