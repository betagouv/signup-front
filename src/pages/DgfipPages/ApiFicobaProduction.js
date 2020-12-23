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
} from './api-impot-particulier-common';
import { CadreJuridiqueDescription } from './ApiFicobaSandbox';

const steps = ['api_ficoba_sandbox', 'api_ficoba_production'];

const ApiFicobaProduction = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.api_ficoba_production}`,
        alt: `Logo ${TARGET_API_LABELS.api_ficoba_production}`,
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
          subject:
            'Contact%20via%20datapass.api.gouv.fr%20-%20API%20FICOBA%20production',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="api_ficoba_production"
        steps={steps}
        PreviousEnrollmentDescription={PreviousEnrollmentDescription}
        title="Demande d'accès à la production API FICOBA"
        DemarcheDescription={DemarcheDescription}
      >
        <RecetteFonctionnelleSection />
        <DonneesPersonnellesSection />
        <CadreJuridiqueSection
          CadreJuridiqueDescription={CadreJuridiqueDescription}
        />
        <HomologationSecuriteSection />
        <VolumetrieSection options={[200]} />
        <CguSection cguLink="/docs/cgu_api_ficoba_production_decembre2020_v1.1.pdf" />
      </Form>
    </div>
  </div>
);

ApiFicobaProduction.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiFicobaProduction.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiFicobaProduction;
