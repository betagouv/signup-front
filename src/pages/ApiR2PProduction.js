import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../lib/api';

import Form from '../components/Form';
import Nav from '../components/Nav';
import HomologationSecuriteSection from '../components/form-sections/dgfip/HomologationSecuriteSection';
import RecetteFonctionnelleSection from '../components/form-sections/dgfip/RecetteFonctionnelleSection';
import CadreJuridiqueSection from '../components/form-sections/CadreJuridiqueSection';
import DonneesPersonnellesSection from '../components/form-sections/DonneesPersonnellesSection';
import CguSection from '../components/form-sections/CguSection';
import { cguLink } from './ApiImpotParticulier';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      Votre demande d'habilitation pour accéder à l'API « bac à sable » a été
      acceptée, vous pouvez maintenant construire votre démarche/téléservice en
      utilisant l'API exposée dans un environnement bac à sable. Parallèlement
      au développement, vous devez remplir les informations ci-dessous. Elles
      sont nécessaires pour obtenir l'habilitation de l'accès à l'API de
      production.
    </p>
  </div>
);

const PreviousEnrollmentDescription = () => (
  <div className="text-quote">
    <p>
      Vous devez tout d'abord sélectionner la démarche que vous souhaitez
      poursuivre.
    </p>
  </div>
);

const steps = ['api_r2p_sandbox', 'api_r2p_production'];

const ApiR2PProduction = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.api_r2p_production}`,
        alt: `Logo ${TARGET_API_LABELS.api_r2p_production}`,
        url: 'https://www.impots.gouv.fr/',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'recette-fonctionnelle', label: 'Recette fonctionnelle' },
        { id: 'donnees-personnelles', label: 'Données personnelles' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
        { id: 'homologation-securite', label: 'Homologation de sécurité' },
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
        target_api="api_r2p_production"
        steps={steps}
        PreviousEnrollmentDescription={PreviousEnrollmentDescription}
        title="Demande d'accès à la production API R2P"
        DemarcheDescription={DemarcheDescription}
      >
        <RecetteFonctionnelleSection />
        <DonneesPersonnellesSection />
        <CadreJuridiqueSection />
        <HomologationSecuriteSection />
        <CguSection cguLink={cguLink} />
      </Form>
    </div>
  </div>
);

ApiR2PProduction.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiR2PProduction.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiR2PProduction;
