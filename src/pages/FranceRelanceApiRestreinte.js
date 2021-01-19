import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../lib/api';

import Form from '../components/Form';
import Nav from '../components/Nav';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';
import UniquenessWarningNotification from '../components/Form/UniquenessWarningNotification';
import Quote from '../components/Form/components/Quote';
import DateInput from '../components/Form/components/DateInput';
import TextInput from '../components/Form/components/TextInput';
import InformationsBancairesSection from '../components/form-sections/francerelance-sections/InformationsBancairesSection';

export const contacts = {
  comptable: {
    heading: 'Contact comptable',
    description: (
      <p>
        Nous contacterons cette personne pour établir les modalités de versement
        de la subvention.
      </p>
    ),
    family_name: '',
    given_name: '',
    email: '',
    phone_number: '',
  },
};

export const AdditionalMiseEnOeuvreContent = ({
  disabled,
  onChange,
  additional_content: { date_integration = '', types_de_depenses = '' },
}) => (
  <>
    <DateInput
      label="A quelle date prévoyez-vous d'avoir achevé l'intégration de l'API sur le service en ligne visé ?"
      name="additional_content.date_integration"
      value={date_integration}
      disabled={disabled}
      onChange={onChange}
    />
    <TextInput
      label="Indiquez les types de dépenses qui seront financées à travers la subvention accordée ?"
      name="additional_content.types_de_depenses"
      placeholder="paiement du prestataire, paiement de l'éditeur, etc."
      value={types_de_depenses}
      disabled={disabled}
      onChange={onChange}
    />
  </>
);

const steps = ['francerelance_api', 'francerelance_api_restreinte'];

const PreviousEnrollmentDescription = () => (
  <Quote>
    <p>
      Afin de pouvoir obtenir votre subvention, merci de renseigner la demande
      d'API à associer à cette demande.
    </p>
  </Quote>
);

const previousEnrollmentWarning = (
  <>
    <p>
      Pour effectuer votre demande de subvention, vous devez préalablement avoir
      obtenu un accès à une API.
    </p>
    <p>
      Veuillez{' '}
      <a href="https://api.gouv.fr/datapass/api">
        demander votre accès à une API
      </a>{' '}
      avant de continuer cette demande.
    </p>
  </>
);

const FranceRelanceRestreinte = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.francerelance_api_restreinte}`,
        alt: `Logo ${TARGET_API_LABELS.francerelance_api_restreinte}`,
        url: 'https://france-relance.transformation.gouv.fr/',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
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
        steps={steps}
        target_api="francerelance_api_restreinte"
        PreviousEnrollmentDescription={PreviousEnrollmentDescription}
        previousEnrollmentWarning={previousEnrollmentWarning}
        title="Demande de subvention dans le cadre de FranceRelance - Guichet API"
      >
        <UniquenessWarningNotification />
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
