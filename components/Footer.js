import React from 'react';

const Footer = () => (
  <footer className="footer">
      <div className="container">
        <div className="footer__logo">
          <img src="/static/images/etalab.svg" alt="Logo Etalab" />
          <ul className="footer__social">
            <li><a href="https://twitter.com/etalab" title="Twitter"><img src="/static/images/social/twitter.svg" alt="Twitter" className="icon icon-twitter" /></a></li>
            <li><a href="https://github.com/etalab" title="Github"><img src="/static/images/social/github.svg" alt="Github" className="icon icon-github" /></a></li>
            <li><a href="https://www.facebook.com/etalab" title="Facebook"><img src="/static/images/social/facebook.svg" alt="Facebook" className="icon icon-facebook" /></a></li>
            <li><a href="mailto:contact@particulier.api.gouv.fr" title="Nous écrire un mail"><img src="/static/images/social/email.svg" alt="Email" className="icon icon-mail" /></a></li>
          </ul>
        </div>
        <ul className="footer__links">
          <li><h2>template.data.gouv.fr</h2></li>
          <li><a href="https://www.data.gouv.fr/reference">Données de référence</a></li>
          <li><a href="https://www.data.gouv.fr/terms">Conditions générales d'utilisation</a></li>
          <li><a href="https://www.data.gouv.fr/api">API</a></li>
        </ul>
        <ul className="footer__links"></ul>
      </div>
  </footer>
);

export default Footer;
