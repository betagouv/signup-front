import Link from 'next/link'
import React from 'react'
import OAuth from '../lib/oauth'
import User from '../lib/user'

class Header extends React.Component {
  constructor() {
    super()
    this.oauth = new OAuth()

    this.state = {
      user: new User()
    }
  }

  login() {
    if (typeof window !== 'undefined') {
      this.oauth.authorize(window.location.url)
    }
  }

  componentDidMount() {
    const {user} = this.state
    const hash = window.location.hash.split('&').map(e => e.split('='))
    const token = hash.filter(e => e[0].match(/access_token/))[0]
    if (token && token[1]) {
      localStorage.setItem('token', token)
    }

    user.login(token).then(user => {
      this.setState({user, email: user.email})
    })
  }

  render() {
    const self = this
    const {email} = this.state
    function logout() {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('token')
      }
      self.setState({email: null})
    }
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
                {email && (
                  <div className='dropdown'>
                    { email }
                    <div className='dropdown-content'>
                      <a onClick={logout}>Se déconnecter</a>
                    </div>
                  </div>
                )
                }
                {
                  !email && (
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
