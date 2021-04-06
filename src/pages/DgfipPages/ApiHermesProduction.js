import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../../lib/api';

import Form from '../../components/Form';
import Nav from '../../components/Nav';
import HomologationSecuriteSection from '../../components/form-sections/dgfip-sections/HomologationSecuriteSection';
import RecetteFonctionnelleSection from '../../components/form-sections/dgfip-sections/RecetteFonctionnelleSection';
import CadreJuridiqueSection from '../../components/form-sections/CadreJuridiqueSection';
import DonneesPersonnellesSection from '../../components/form-sections/DonneesPersonnellesSection';
import VolumetrieSection from '../../components/form-sections/dgfip-sections/VolumetrieSection';
import CguSection from '../../components/form-sections/CguSection';
import {
  DemarcheDescriptionProduction as DemarcheDescription,
  PreviousEnrollmentDescription,
} from './common';

const target_api = 'api_hermes_production';
const steps = ['api_hermes_sandbox', target_api];

const ApiHermesProduction = ({
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
        { id: 'recette-fonctionnelle', label: 'Recette fonctionnelle' },
        { id: 'donnees-personnelles', label: 'Données personnelles' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
        { id: 'homologation-securite', label: 'Homologation de sécurité' },
        { id: 'volumetrie', label: 'Volumétrie' },
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
        PreviousEnrollmentDescription={PreviousEnrollmentDescription}
        title={`Demande d’accès ${TARGET_API_LABELS[target_api]}`}
        DemarcheDescription={DemarcheDescription}
      >
        <RecetteFonctionnelleSection />
        <DonneesPersonnellesSection />
        <CadreJuridiqueSection />
        <HomologationSecuriteSection />
        <VolumetrieSection options={[1000]} />
        <CguSection cguLink="/docs/cgu_api_r2p_production_septembre2020_v2.5.pdf" />
      </Form>
    </div>
  </div>
);

ApiHermesProduction.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiHermesProduction.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiHermesProduction;
