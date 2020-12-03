import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../lib/api';

import Form from '../components/Form';
import Nav from '../components/Nav';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import DonneesPersonnellesSection from '../components/form-sections/DonneesPersonnellesSection';
import CguSection from '../components/form-sections/CguSection';
import LabelsSection from '../components/form-sections/aidants-connect-sections/LabelsSection';
import AidantsSection from '../components/form-sections/aidants-connect-sections/AidantsSection';
import StructureSection from '../components/form-sections/aidants-connect-sections/StructureSection';

const AidantsConnect = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.aidants_connect}`,
        alt: `Logo ${TARGET_API_LABELS.aidants_connect}`,
        url: 'https://aidantsconnect.beta.gouv.fr/',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'structure', label: 'Structure' },
        { id: 'labels', label: 'Labels' },
        { id: 'donnees-personnelles', label: 'Données personnelles' },
        { id: 'aidants', label: 'Les aidants' },
        { id: 'cgu', label: "Modalités d'utilisation" },
      ]}
      contactInformation={[
        {
          email: 'contact@aidantsconnect.beta.gouv.fr',
          label: 'Nous contacter',
          subject: 'Contact%20via%20datapass.api.gouv.fr',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="aidants_connect"
        title="Demande d'habilitation juridique à Aidants Connect"
      >
        <OrganisationSection />
        <StructureSection />
        <LabelsSection />
        <DonneesPersonnellesSection />
        <AidantsSection />
        <CguSection cguLink="https://aidantsconnect.beta.gouv.fr/cgu/" />
      </Form>
    </div>
  </div>
);

AidantsConnect.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

AidantsConnect.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default AidantsConnect;
