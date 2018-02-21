import Link from 'next/link'
import React from 'react'

const Header = () => (
  <header>
    <nav className='nav'>
      <div className='nav__container'>
        <a className='nav__link' href='/'>
          <img className='nav__logo' src='static/images/logo-api-particulier.png' alt='Accueil de particulier.api.data.gouv.fr' />
        </a>
        <ul className='nav__links'>
          <li><Link href='/about'><a>A propos</a></Link></li>
          <li><Link href='/contact'><a>Contactez-nous</a></Link></li>
        </ul>
      </div>
    </nav>
  </header>
)

export default Header
