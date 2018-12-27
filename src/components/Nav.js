import React from 'react';
import PropTypes from 'prop-types';

const Nav = ({ isCnam, logo, navLinksGeneral, titleContenusSupplementaires, navLinksContenusSupplementaires }) => (
  <nav className="side-pane">
    <ul className="side-pane__menu">
      {logo && (
        <li className="text-center">
          <a className="side-pane__link" href="https://www.impots.gouv.fr/">
            <img
              alt={logo.alt}
              src={logo.src}
              style={{ mixBlendMode: 'multiply' }}
            />
          </a>
        </li>
      )}
      <li className="side-pane__title">
        <h2>Votre demande</h2>
      </li>
        {navLinksGeneral.map(({id, text}) => (
          <li key={id}>
            <a className="side-pane__link" href={id}>
              {text}
            </a>
          </li>
        ))}
    </ul>
    {titleContenusSupplementaires && (
      <ul className="side-pane__menu">
        <li className="side-pane__title">
          <h2>{titleContenusSupplementaires}</h2>
        </li>
        {navLinksContenusSupplementaires.map(({id, text}) => (
          <li key={id}>
            <a className="side-pane__link" href={id}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    )}
  </nav>
);

Nav.propTypes = {
  logo: PropTypes.object,
  navLinksGeneral: PropTypes.array.isRequired,
  titleContenusSupplementaires: PropTypes.string,
  navLinksContenusSupplementaires: PropTypes.array
};

export default Nav;
