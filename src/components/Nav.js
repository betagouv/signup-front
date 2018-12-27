import React from 'react';
import PropTypes from 'prop-types';

const Nav = ({ isCnam, isDgfip, logo }) => (
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
      <li>
        <a className="side-pane__link" href="#demarche">
          Démarche
        </a>
      </li>
      <li>
        <a className="side-pane__link" href="#identite">
          Identité
        </a>
      </li>
      <li>
        <a className="side-pane__link" href="#contacts">
          Contacts
        </a>
      </li>
      <li>
        <a className="side-pane__link" href="#cadre-juridique">
          Cadre juridique
        </a>
      </li>
      {!isCnam && (
        <li>
          <a className="side-pane__link" href="#donnees">
            Données
          </a>
        </li>
      )}
      <li>
        <a className="side-pane__link" href="#cgu">
          Modalités d&apos;utilisation
        </a>
      </li>
    </ul>
    {isDgfip && (
      <ul className="side-pane__menu">
        <li className="side-pane__title">
          <h2>Données de productions</h2>
        </li>
        <li>
          <a className="side-pane__link" href="#entrants-techniques">
            Entrants techniques
          </a>
        </li>
        <li>
          <a className="side-pane__link" href="#homologation-securite">
            Homologation de sécurité
          </a>
        </li>
        <li>
          <a className="side-pane__link" href="#volumetrie">
            Volumétrie
          </a>
        </li>
        <li>
          <a className="side-pane__link" href="#recette-fonctionnelle">
            Recette fonctionnelle
          </a>
        </li>
      </ul>
    )}
  </nav>
);

Nav.propTypes = {
  isCnam: PropTypes.bool,
  isDgfip: PropTypes.bool,
  logo: PropTypes.object
};

Nav.defaultProps = {
  isCnam: false,
  isDgfip: false,
};

export default Nav;
