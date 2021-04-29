import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './Nav.css';
import ArrowBackIcon from '../atoms/icons/arrow-back';
import { ScrollableLink } from './Scrollable';
import LocalPhoneIcon from '../atoms/icons/local-phone';
import { goBack } from '../../lib';

const Nav = ({ logo, navLinks, contactInformation, history }) => (
  <aside className="side-menu" role="navigation">
    <div className="side-menu-container">
      <nav>
        <ul>
          <li>
            <button
              className="light"
              onClick={() => goBack(history)}
              style={{ color: 'var(--theme-primary)' }}
            >
              <span style={{ verticalAlign: 'sub' }}>
                <ArrowBackIcon color={'var(--theme-primary)'} size={20} />
              </span>
              Mes demandes
            </button>
          </li>
        </ul>
        <ul className="form-nav">
          {logo && (
            <li>
              <a href={logo.url}>
                <img
                  alt={logo.alt}
                  src={logo.src}
                  className="form-nav-logo"
                  height="90"
                />
              </a>
            </li>
          )}
          {navLinks.map(({ id, label, style = {} }) => (
            <ScrollableLink key={id} scrollableId={id} style={style}>
              {label}
            </ScrollableLink>
          ))}
        </ul>
      </nav>

      {contactInformation && (
        <div className="section section-grey">
          <div className="container">
            <div className="help-links-header">Une question&nbsp;?</div>

            <div className="contact-button-list">
              {contactInformation.map(({ tel, email, label, subject }) =>
                tel ? (
                  <a
                    key={tel}
                    className="button-outline primary"
                    href={`tel:${tel}`}
                  >
                    <LocalPhoneIcon color="var(--blue)" />
                    {tel}
                  </a>
                ) : (
                  <a
                    key={label}
                    className="button-outline primary"
                    href={`mailto:${email}?subject=${subject}`}
                  >
                    {label}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  </aside>
);

Nav.propTypes = {
  navLinks: PropTypes.array.isRequired,
  contactInformation: PropTypes.array,
  logo: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        fromList: PropTypes.bool,
      }),
    }),
  }),
};

export default withRouter(Nav);
