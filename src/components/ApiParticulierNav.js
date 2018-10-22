import React from 'react';

const ApiParticulierNav = () => (
  <nav className="side-pane">
    <ul className="side-pane__menu">
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
  </nav>
);

export default ApiParticulierNav;
