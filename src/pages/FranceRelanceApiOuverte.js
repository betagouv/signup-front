import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../lib/api';

import Form from '../components/Form';
import Nav from '../components/Nav';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';
import UniquenessWarningNotification from '../components/Form/UniquenessWarningNotification';
import InformationsBancairesSection from '../components/form-sections/francerelance-sections/InformationsBancairesSection';
import {
  AdditionalMiseEnOeuvreContent,
  contacts,
} from './FranceRelanceApiRestreinte';
import DescriptionSection from '../components/form-sections/DescriptionSection';

const FranceRelanceRestreinte = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.francerelance_api_ouverte}`,
        alt: `Logo ${TARGET_API_LABELS.francerelance_api_ouverte}`,
        url: 'https://france-relance.transformation.gouv.fr/',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'description', label: 'Description' },
        { id: 'contacts-moe', label: 'Contexte' },
        { id: 'informations-bancaires', label: 'Informations bancaires' },
      ]}
      contactInformation={[
        {
          email: 'pmo.francerelance@modernisation.gouv.fr',
          label: 'Nous contacter',
          subject: 'Contact%20via%20datapass.api.gouv.fr',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="francerelance_api_ouverte"
        title="Demande de subvention dans le cadre de FranceRelance - Guichet API"
      >
        <UniquenessWarningNotification />
        <OrganisationSection />
        <DescriptionSection />
        <MiseEnOeuvreSection
          sectionTitle="Le contexte de la subvention"
          initialContacts={contacts}
          MiseEnOeuvreDescription={() => null}
          AdditionalMiseEnOeuvreContent={AdditionalMiseEnOeuvreContent}
        />
        <InformationsBancairesSection />
      </Form>
    </div>
  </div>
);

FranceRelanceRestreinte.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

FranceRelanceRestreinte.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default FranceRelanceRestreinte;
