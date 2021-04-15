import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';

const { REACT_APP_API_GOUV_HOST: API_GOUV_HOST } = process.env;

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <ul className="footer__links">
        <li>
          <a href="/stats">Statistiques d’utilisation</a>
        </li>
        <li>
          <a href={`${API_GOUV_HOST}/apropos`}>Qu’est ce qu’une API ?</a>
        </li>
      </ul>
      <ul className="footer__links">
        <li>
          <a href={`/docs/cgu_datapass.pdf`}>
            Conditions générales d’utilisation
          </a>
        </li>
        <li>
          <NavLink exact to={`/accessibilite`}>
            Déclaration d’accessibilité
          </NavLink>
        </li>
      </ul>
      <ul className="footer__links">
        <li>
          <a href="https://beta.gouv.fr/">Une réalisation de beta.gouv.fr</a>
        </li>
        <li>
          <a href="https://numerique.gouv.fr/">Une mission de la DINUM</a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
