import Link from 'next/link'
import React from 'react'
import OAuth from '../lib/oauth'
import User from '../lib/user'
import Utils from '../lib/utils'

class Header extends React.Component {
  constructor() {
    super()
    this.oauth = new OAuth()
    this.logout = this.logout.bind(this)

    this.state = {
      user: new User()
    }
  }

  componentDidMount() {
    const {user} = this.state

    if (typeof window !== 'undefined') {
      const token = Utils.extractTokenFromUrl(window.location.toString())
      user.login(token).then(user => {
        this.setState({user})
      })
    }
  }

  logout() {
    const {user} = this.state

    user.logout().then(user => this.setState({user}))
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
              <li><Link href='/about'><a>A propos</a></Link></li>
              <li><Link href='/documentation'><a>Documentation technique</a></Link></li>
              <li><Link href='/contact'><a>Contactez-nous</a></Link></li>
              <li>
                {user.email && (
                  <div className='dropdown'>
                    { user.email }
                    <div className='dropdown-content'>
                      <a onClick={this.logout}>Se déconnecter</a>
                    </div>
                  </div>
                )
                }
                {
                  !user.email && (
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

export default Header
