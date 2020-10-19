import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../lib/api';

import Form from '../components/Form';
import Nav from '../components/Nav';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import DescriptionSection from '../components/form-sections/DescriptionSection';
import DonneesPersonnellesSection from '../components/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';
import CguSection from '../components/form-sections/CguSection';

const contacts = {
  organization: {
    heading: 'Responsable organisation',
    description: () => (
      <p>
        Cette personne recevra les accès par mail. Le numéro de téléphone sera
        utilisé pour vous contacter pour vous donner les accès.
      </p>
    ),
    email: '',
    phone_number: '',
  },
};

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
        url: 'https://aidantsconnect.beta.gouv.fr//',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'description', label: 'Description' },
        { id: 'donnees-personnelles', label: 'Données personnelles' },
        { id: 'contacts-moe', label: 'Mise en œuvre' },
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
        target_api="aidants-connect"
        title="Demande d'habilitation juridique à Aidants Connect"
      >
        <OrganisationSection />
        <DescriptionSection />
        <DonneesPersonnellesSection />
        <MiseEnOeuvreSection initialContacts={contacts} />
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
