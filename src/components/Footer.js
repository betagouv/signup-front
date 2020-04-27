import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer__logo">
        <a href="https://api.gouv.fr/signup/api">
          <img
            src="/images/logo-api.gouv.fr-white.png"
            alt="Logo api.gouv.fr"
          />
        </a>
        <ul className="footer__social">
          <li>
            <a href="https://twitter.com/BetaGouv" title="Twitter">
              <img
                src="/images/social/twitter.svg"
                alt="Twitter"
                className="icon icon-twitter"
              />
            </a>
          </li>
          <li>
            <a href="https://github.com/betagouv" title="Github">
              <img
                src="/images/social/github.svg"
                alt="Github"
                className="icon icon-github"
              />
            </a>
          </li>
          <li>
            <a
              href="mailto:contact@api.gouv.fr?subject=Contact%20via%20signup.api.gouv.fr"
              title="Nous écrire un mail"
            >
              <img
                src="/images/social/email.svg"
                alt="Email"
                className="icon icon-mail"
              />
            </a>
          </li>
        </ul>
      </div>
      <ul className="footer__links">
        <li>
          <h2>api.gouv.fr</h2>
        </li>
        <li>
          <a href="http://beta.gouv.fr/">Une réalisation de beta.gouv.fr</a>
        </li>
        <li>
          <a href="https://numerique.gouv.fr/">Une mission de la DINUM</a>
        </li>
        <li>
          <a href="http://etatplateforme.modernisation.gouv.fr/">
            Un site de l'État plateforme
          </a>
        </li>
        <li>
          <a href="https://api.gouv.fr/apropos#quest-ce-quune-api">
            Qu'est ce qu'une API ?
          </a>
        </li>
        <li>
          <a href="https://api.gouv.fr/apropos#mentions-légales">
            Mentions légales
          </a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
