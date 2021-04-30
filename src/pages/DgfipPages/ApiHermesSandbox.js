import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../../lib/api';

import Form from '../../components/templates/Form';
import DgfipRgpdAgreement from '../../components/organisms/form-sections/DonneesSection/DgfipRgpdAgreement';
import TextSection from '../../components/organisms/form-sections/TextSection';
import DescriptionSection from '../../components/organisms/form-sections/DescriptionSection';
import OrganisationSection from '../../components/organisms/form-sections/OrganisationSection';
import CguSection from '../../components/organisms/form-sections/CguSection';
import MiseEnOeuvreSection from '../../components/organisms/form-sections/MiseEnOeuvreSection';
import CadreJuridiqueSection from '../../components/organisms/form-sections/CadreJuridiqueSection';
import { contacts, SuiteDescription } from './common';
import Quote from '../../components/atoms/inputs/Quote';

DgfipRgpdAgreement.propTypes = {
  additional_content: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const target_api = 'api_hermes_sandbox';
const steps = [target_api, 'api_hermes_production'];

const ApiHermesSandbox = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api={target_api}
    steps={steps}
    title={`Demande d’accès ${TARGET_API_LABELS[target_api]}`}
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
    <DescriptionSection />
    <MiseEnOeuvreSection initialContacts={contacts} />
    <TextSection title="Les données dont vous avez besoin" id="donnees">
      <Quote>
        <p>
          Les données échangées par l’API sont décrites dans les CGU attachées à
          cette demande.
        </p>
      </Quote>
    </TextSection>
    <CadreJuridiqueSection />
    <CguSection cguLink="/docs/cgu_api_hermes_bac_a_sable_v1_1_19-04-2021.pdf" />
    <TextSection title="" id="next-steps-description">
      <SuiteDescription />
    </TextSection>
  </Form>
);

ApiHermesSandbox.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiHermesSandbox.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiHermesSandbox;
