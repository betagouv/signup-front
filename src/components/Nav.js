import React from 'react';
import PropTypes from 'prop-types';

const Nav = ({
  logo,
  navLinksGeneral,
  titleAdditionalContent,
  navLinksAdditionalContent,
  contactInformation,
}) => (
  <aside className="side-menu" role="navigation">
    <ul>
      {logo && (
        <li>
          <a href="https://www.impots.gouv.fr/">
            <img
              alt={logo.alt}
              src={logo.src}
              style={{ mixBlendMode: 'multiply' }}
            />
          </a>
        </li>
      )}
      {navLinksGeneral.map(({ id, label }) => (
        <li key={id}>
          <a href={`#${id}`}>{label}</a>
        </li>
      ))}
      {titleAdditionalContent &&
        navLinksAdditionalContent.map(({ id, label }) => (
          <li key={id}>
            <a className="side-pane__link" href={`#${id}`}>
              {label}
            </a>
          </li>
        ))}
    </ul>

    {contactInformation && (
      <div className="section section-grey">
        <div className="container">
          <h3>Une question ?</h3>

          <div className="contact-button-list">
            {contactInformation.map(({ email, label, subject }) => (
              <button
                key={label}
                className="button-outline primary"
                href={`mailto:${email}?subject=${subject}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )}
  </aside>
);

Nav.propTypes = {
  logo: PropTypes.object,
  navLinksGeneral: PropTypes.array.isRequired,
  titleAdditionalContent: PropTypes.string,
  navLinksAdditionalContent: PropTypes.array,
  contactInformation: PropTypes.array,
};

export default Nav;
