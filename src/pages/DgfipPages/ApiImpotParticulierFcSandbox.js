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
import VolumetrieSection from '../../components/form-sections/dgfip-sections/VolumetrieSection';
import CadreJuridiqueSection from '../../components/form-sections/CadreJuridiqueSection';
import {
  availableScopes,
  CadreJuridiqueDescription,
  CguDescription,
  cguLink,
  contacts,
  DemarcheDescription,
  DonneesDescription,
  DonneesFootnote,
  SuiteDescription,
} from './api-impot-particulier-common';

const steps = [
  'franceconnect',
  'api_impot_particulier_fc_sandbox',
  'api_impot_particulier_fc_production',
];

const ApiImpotParticulierFcSandbox = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.api_impot_particulier_fc_sandbox}`,
        alt: `Logo ${TARGET_API_LABELS.api_impot_particulier_fc_sandbox}`,
        url: 'https://www.impots.gouv.fr/',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'description', label: 'Description' },
        { id: 'volumetrie', label: 'Volumétrie' },
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
            'Contact%20via%20signup.api.gouv.fr%20-%20API%20Impôt%20particulier',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="api_impot_particulier_fc_sandbox"
        steps={steps}
        title="Demande d’accès au bac à sable API Impôt particulier"
        DemarcheDescription={DemarcheDescription}
      >
        <OrganisationSection />
        <DescriptionSection />
        <VolumetrieSection />
        <MiseEnOeuvreSection initialContacts={contacts} />
        <DonneesSection
          availableScopes={availableScopes}
          AdditionalRgpdAgreement={DgfipRgpdAgreement}
          DonneesDescription={DonneesDescription}
          DonneesFootnote={DonneesFootnote}
        />
        <CadreJuridiqueSection
          CadreJuridiqueDescription={CadreJuridiqueDescription}
        />
        <CguSection cguLink={cguLink} CguDescription={CguDescription} />
        <TextSection Description={SuiteDescription} title="" />
      </Form>
    </div>
  </div>
);

ApiImpotParticulierFcSandbox.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiImpotParticulierFcSandbox.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiImpotParticulierFcSandbox;
