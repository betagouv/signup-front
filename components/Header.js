import Link from 'next/link';
import React from 'react';

const Header = () => (
  <header>
    <nav className="nav">
      <div className="nav__container">
        <a className="nav__link" href="index.html">
          <img className="nav__logo" src="static/images/logo_site.svg" alt="Accueil de particulier.api.data.gouv.fr" />
        </a>
        <ul className="nav__links">
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/about"><a>About</a></Link></li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Header;
