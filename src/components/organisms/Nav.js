import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ScrollableLink } from './Scrollable';
import { goBack } from '../../lib';
import { TARGET_API_LABELS } from '../../lib/api';
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
    <nav
      className="fr-sidemenu fr-sidemenu--sticky-full-height"
      aria-label="Menu latéral"
    >
      <div className="fr-sidemenu__inner">
        <div className="fr-collapse" id="fr-sidemenu-wrapper">
          <button
            className="fr-btn fr-btn--sm fr-btn--icon-left fr-fi-arrow-left-line demandes"
            onClick={() => goBack(history)}
          >
            Toutes mes demandes
          </button>
          <div className="fr-sidemenu__title">
            <a href="#head">Formulaire</a>
          </div>
          <ul className="fr-sidemenu__list">
            {navElements.map(({ id, label }) => (
              <ScrollableLink key={id} scrollableId={id}>
                {label}
              </ScrollableLink>
            ))}
          </ul>
          {contactElements.map(({ tel, email, label, subject }) =>
            tel ? (
              <a
                key={tel}
                className="fr-btn fr-btn--secondary"
                href={`tel:${tel}`}
              >
                {tel}
              </a>
            ) : (
              <a key={label} href={`mailto:${email}?subject=${subject}`}>
                <button className="fr-btn fr-btn--secondary fr-btn--sm fr-btn--icon-right fr-fi-mail-line">
                  {label}
                </button>
              </a>
            )
          )}
        </div>
      </div>
    </nav>
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
