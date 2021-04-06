import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../../lib/api';

import Form from '../../components/Form';
import Nav from '../../components/Nav';
import DgfipRgpdAgreement from '../../components/form-sections/DonneesSection/DgfipRgpdAgreement';
import TextSection from '../../components/form-sections/TextSection';
import DescriptionSection from '../../components/form-sections/DescriptionSection';
import OrganisationSection from '../../components/form-sections/OrganisationSection';
import CguSection from '../../components/form-sections/CguSection';
import MiseEnOeuvreSection from '../../components/form-sections/MiseEnOeuvreSection';
import CadreJuridiqueSection from '../../components/form-sections/CadreJuridiqueSection';
import { contacts, SuiteDescription } from './common';
import Quote from '../../components/Form/components/Quote';

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
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS[target_api]}`,
        alt: `Logo ${TARGET_API_LABELS[target_api]}`,
        url: 'https://www.impots.gouv.fr/',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'modeles-preremplis', label: 'Modèles pré-remplis' },
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
          subject: `Contact%20via%20datapass.api.gouv.fr%20-%20${encodeURIComponent(
            TARGET_API_LABELS[target_api]
          )}`,
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api={target_api}
        steps={steps}
        title={`Demande d’accès ${TARGET_API_LABELS[target_api]}`}
      >
        <OrganisationSection />
        <DescriptionSection />
        <MiseEnOeuvreSection initialContacts={contacts} />
        <TextSection title="Les données dont vous avez besoin" id="donnees">
          <Quote>
            <p>
              Les données échangées par l'API sont décrites dans les CGU
              attachées à cette demande.
            </p>
          </Quote>
        </TextSection>
        <CadreJuridiqueSection />
        <CguSection cguLink="/docs/cgu_api_r2p_bac_a_sable_septembre2020_v2.6.pdf" />
        <TextSection title="" id="next-steps-description">
          <SuiteDescription />
        </TextSection>
      </Form>
    </div>
  </div>
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
