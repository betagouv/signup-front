import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../../lib/api';

import Form from '../../components/Form';
import Nav from '../../components/Nav';
import DgfipRgpdAgreement from '../../components/form-sections/DonneesSection/DgfipRgpdAgreement';
import TextSection from '../../components/form-sections/TextSection';
import DescriptionSection from '../../components/form-sections/DescriptionSection';
import OrganisationSection from '../../components/form-sections/OrganisationSection';
import DonneesSection from '../../components/form-sections/DonneesSection';
import CguSection from '../../components/form-sections/CguSection';
import MiseEnOeuvreSection from '../../components/form-sections/MiseEnOeuvreSection';
import CadreJuridiqueSection from '../../components/form-sections/CadreJuridiqueSection';
import {
  contacts,
  DonneesDescription,
  SuiteDescription,
} from './api-impot-particulier-common';

DgfipRgpdAgreement.propTypes = {
  additional_content: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const groupTitle = "Modalité d'accès à l'API :";

const availableScopes = [
  {
    value: 'dgfip_ficoba_etat_civil_denomination',
    label: 'État civil ou dénomination',
  },
  {
    value: 'dgfip_ficoba_adresse',
    label: 'Adresse',
  },
  {
    value: 'dgfip_ficoba_compte',
    label: 'Désignation du compte',
  },
  {
    value: 'dgfip_ficoba_etablissement_bancaire',
    label: 'Établissement bancaire',
  },
  {
    value: 'dgfip_ficoba_date',
    label: 'Date',
  },
  {
    value: 'dgfip_acces_ficoba_iban',
    label: 'via IBAN',
    groupTitle,
  },
  {
    value: 'dgfip_acces_ficoba_spi',
    label: 'via le Numéro fiscal (SPI)',
    groupTitle,
  },
  {
    value: 'dgfip_acces_ficoba_siren',
    label: 'via SIREN/SIRET',
    groupTitle,
  },
  {
    value: 'dgfip_acces_ficoba_personne_physique',
    label: 'via personne physique',
    groupTitle,
  },
  {
    value: 'dgfip_acces_ficoba_personne_morale',
    label: 'via personne morale',
    groupTitle,
  },
];

const steps = ['api_ficoba_sandbox', 'api_ficoba_production'];

const ApiFicobaSandbox = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.api_ficoba_sandbox}`,
        alt: `Logo ${TARGET_API_LABELS.api_ficoba_sandbox}`,
        url: 'https://www.impots.gouv.fr/',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'description', label: 'Description' },
        { id: 'contacts-moe', label: 'Mise en œuvre' },
        { id: 'donnees', label: 'Données' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
        { id: 'cgu', label: 'Modalités d’utilisation' },
      ]}
      contactInformation={[
        {
          email: 'contact@api.gouv.fr',
          label: 'Nous contacter',
          subject:
            'Contact%20via%20datapass.api.gouv.fr%20-%20API%20FICOBA%20bac%20%C3%A0%20sable',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="api_ficoba_sandbox"
        steps={steps}
        title="Demande d’accès au bac à sable API FICOBA"
      >
        <OrganisationSection />
        <DescriptionSection />
        <MiseEnOeuvreSection initialContacts={contacts} />
        <DonneesSection
          availableScopes={availableScopes}
          AdditionalRgpdAgreement={DgfipRgpdAgreement}
          DonneesDescription={DonneesDescription}
        />
        <CadreJuridiqueSection />
        <CguSection cguLink="/docs/cgu_api_r2p_bac_a_sable_septembre2020_v2.6.pdf" />
        <TextSection Description={SuiteDescription} title="" />
      </Form>
    </div>
  </div>
);

ApiFicobaSandbox.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiFicobaSandbox.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiFicobaSandbox;
