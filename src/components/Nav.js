import React from 'react';
import PropTypes from 'prop-types';
import './Nav.css';

const Nav = ({
  logo,
  navLinksGeneral,
  titleAdditionalContent,
  navLinksAdditionalContent,
  contactInformation,
}) => (
  <aside className="side-menu" role="navigation">
    <div className="side-menu-container">
      <ul className="form-nav">
        {logo && (
          <li>
            <a href="https://www.impots.gouv.fr/">
              <img alt={logo.alt} src={logo.src} className="form-nav-logo" />
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
        <div className="section section-grey help-links">
          <div className="container">
            <h3>Une question&nbsp;?</h3>

            <div className="contact-button-list">
              {contactInformation.map(({ email, label, subject }) => (
                <a
                  key={label}
                  className="button-outline primary"
                  href={`mailto:${email}?subject=${subject}`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
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
