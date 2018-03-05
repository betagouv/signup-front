import Link from 'next/link'
import React from 'react'
import OAuth from '../lib/oauth'
import User from '../lib/user'

class Header extends React.Component {
  constructor () {
    super()
    this.oauth = new OAuth()

    this.state = {
      user: new User(),
    }
  }
  login () {
    if (typeof window) this.oauth.authorize(window.location.url)
  }
  logout () {
    if (typeof window) window.localStorage.removeItem('token')
    this.setState({email: null})
  }

  componentDidMount () {
    const hash = window.location.hash.split('&').map((e) => e.split('='))
    const token = hash.filter((e) => e[0] =~ /access_token/)[0][1]
    if (token) localStorage.setItem('token', token)

    this.state.user.login(token).then((user) => {
      console.log(user)
      this.setState({ user: user, email: user.email })
    })
  }

  render () {

    const logBox = () => {
      if (this.state.email) {
        return <div className="dropdown">
          { this.state.email }
          <div className="dropdown-content">
            <a onClick={ () => this.logout() }>Se déconnecter</a>
          </div>
        </div>
      } else {
          return <a href={ this.oauth.client.token.getUri() }>Se connecter</a>
      }
    }
    return <header>
      <nav className='nav'>
        <div className='nav__container'>
          <a className='nav__link' href='/'>
            <img className='nav__logo' src='/static/images/logo-api-particulier.png' alt='Accueil de particulier.api.data.gouv.fr' />
          </a>
          <ul className='nav__links'>
            <li><Link href='/about'><a>A propos</a></Link></li>
            <li><Link href='/documentation'><a>Documentation technique</a></Link></li>
            <li><Link href='/contact'><a>Contactez-nous</a></Link></li>
            <li>{ logBox() }</li>
          </ul>
        </div>
      </nav>
    </header>
  }
}

export default Header
