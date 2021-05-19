import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './Nav.css';
import ArrowBackIcon from '../atoms/icons/arrow-back';
import { ScrollableLink } from './Scrollable';
import LocalPhoneIcon from '../atoms/icons/local-phone';
import { goBack } from '../../lib';
import { API_ICONS, TARGET_API_LABELS } from '../../lib/api';
import { isEmpty } from 'lodash';

const Nav = ({
  target_api,
  logoLinkUrl,
  sectionLabels = [],
  contactInformation = [],
  history,
}) => {
  const navElements = useMemo(
    () =>
      sectionLabels.map((sectionName) => ({
        id: encodeURIComponent(sectionName),
        label: sectionName,
      })),
    [sectionLabels]
  );

  const contactElements = useMemo(
    () =>
      isEmpty(contactInformation)
        ? [
            {
              email: 'contact@api.gouv.fr',
              label: 'Nous contacter',
              subject: `Contact%20via%20datapass.api.gouv.fr%20-%20${encodeURIComponent(
                TARGET_API_LABELS[target_api]
              )}`,
            },
          ]
        : contactInformation,
    [contactInformation, target_api]
  );

  const defaultedLogoLinkUrl = useMemo(
    () =>
      logoLinkUrl
        ? logoLinkUrl
        : `https://api.gouv.fr/les-api/${target_api.replace(/_/g, '-')}`,
    [logoLinkUrl, target_api]
  );

  return (
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
            {!!API_ICONS[target_api] && (
              <li>
                <a href={defaultedLogoLinkUrl}>
                  <img
                    alt={`Logo ${TARGET_API_LABELS[target_api]}`}
                    src={`/images/${API_ICONS[target_api]}`}
                    className="form-nav-logo"
                    height="90"
                  />
                </a>
              </li>
            )}
            <ScrollableLink scrollableId="head" style={{ fontWeight: 'bold' }}>
              Formulaire
            </ScrollableLink>
            {navElements.map(({ id, label }) => (
              <ScrollableLink key={id} scrollableId={id}>
                {label}
              </ScrollableLink>
            ))}
          </ul>
        </nav>

        <div className="section section-grey">
          <div className="container">
            <div className="help-links-header">Une question&nbsp;?</div>

            <div className="contact-button-list">
              {contactElements.map(({ tel, email, label, subject }) =>
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
      </div>
    </aside>
  );
};

Nav.propTypes = {
  sectionLabels: PropTypes.array.isRequired,
  contactInformation: PropTypes.array,
  logoLinkUrl: PropTypes.string,
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
