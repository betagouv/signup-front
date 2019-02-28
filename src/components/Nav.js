import React from 'react';
import PropTypes from 'prop-types';

const Nav = ({
  logo,
  navLinksGeneral,
  titleAdditionalContent,
  navLinksAdditionalContent,
  contactInformation,
}) => (
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
      <li>
        <h2>Votre demande</h2>
      </li>
      {navLinksGeneral.map(({ id, label }) => (
        <li key={id}>
          <a className="side-pane__link" href={`#${id}`}>
            {label}
          </a>
        </li>
      ))}
    </ul>
    {titleAdditionalContent && (
      <ul className="side-pane__menu">
        <li>
          <h2>{titleAdditionalContent}</h2>
        </li>
        {navLinksAdditionalContent.map(({ id, label }) => (
          <li key={id}>
            <a className="side-pane__link" href={`#${id}`}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    )}
    {contactInformation && (
      <ul className="side-pane__menu">
        <li>
          <h2>Contact</h2>
        </li>
        {contactInformation.map(({ email, label, subject }) => (
          <li key={label}>
            <a
              className="button secondary"
              href={`mailto:${email}?subject=${subject}`}
            >
              {label}
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
  titleAdditionalContent: PropTypes.string,
  navLinksAdditionalContent: PropTypes.array,
  contactInformation: PropTypes.array,
};

export default Nav;
