import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../../lib/api';

import Form from '../../components/templates/Form';
import DgfipRgpdAgreement from '../../components/organisms/form-sections/DonneesSection/DgfipRgpdAgreement';
import TextSection from '../../components/organisms/form-sections/TextSection';
import DescriptionSection from '../../components/organisms/form-sections/DescriptionSection';
import OrganisationSection from '../../components/organisms/form-sections/OrganisationSection';
import DonneesSection from '../../components/organisms/form-sections/DonneesSection';
import CguSection from '../../components/organisms/form-sections/CguSection';
import MiseEnOeuvreSection from '../../components/organisms/form-sections/MiseEnOeuvreSection';
import CadreJuridiqueSection from '../../components/organisms/form-sections/CadreJuridiqueSection';
import {
  demarches,
  availableScopes,
  CadreJuridiqueDescription,
  CguDescription,
  DemarcheDescription,
  DonneesFootnote,
} from './api-impot-particulier-common';
import { contacts, DonneesDescription, SuiteDescription } from './common';
import DemarcheSection from '../../components/organisms/form-sections/DemarcheSection';

const target_api = 'api_impot_particulier_fc_sandbox';
const steps = [
  'franceconnect',
  target_api,
  'api_impot_particulier_fc_production',
];

const ApiImpotParticulierFcSandbox = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api={target_api}
    steps={steps}
    title={`Demande d’accès ${TARGET_API_LABELS[target_api]}`}
    DemarcheDescription={DemarcheDescription}
    demarches={demarches}
    logo={{
      src: `/images/${API_ICONS[target_api]}`,
      alt: `Logo ${TARGET_API_LABELS[target_api]}`,
      url: 'https://www.impots.gouv.fr/',
    }}
    contactInformation={[
      {
        email: 'contact@api.gouv.fr',
        label: 'Nous contacter',
        subject: `Contact%20via%20datapass.api.gouv.fr%20-%20${encodeURIComponent(
          TARGET_API_LABELS[target_api]
        )}`,
      },
    ]}
  >
    <OrganisationSection />
    <DemarcheSection />
    <DescriptionSection />
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
    <CguSection
      cguLink="/docs/cgu_api_impot_particulier_bac_a_sable_connexion_fc_septembre2020_v2.6.pdf"
      CguDescription={CguDescription}
    />
    <TextSection title="" id="next-steps-description">
      <SuiteDescription />
    </TextSection>
  </Form>
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
