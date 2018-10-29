import React from 'react';
import PropTypes from 'prop-types';

const Nav = ({ isDgfip }) => (
  <nav className="side-pane">
    <ul className="side-pane__menu">
      {isDgfip && (
        <li className="text-center">
          <a className="side-pane__link" href="https://www.impots.gouv.fr/">
            <img
              alt=""
              src="/images/logo-dgfip.png"
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
      <li>
        <a className="side-pane__link" href="#donnees">
          Données
        </a>
      </li>
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
  isDgfip: PropTypes.bool,
};

Nav.defaultProps = {
  isDgfip: false,
};

export default Nav;
