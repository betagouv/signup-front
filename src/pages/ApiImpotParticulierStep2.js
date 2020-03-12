import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../lib/api';

import Form from '../components/Form';
import Nav from '../components/Nav';
import TextSection from '../components/form-sections/TextSection';
import HomologationSecuriteSection from '../components/form-sections/dgfip/HomologationSecuriteSection';
import EntrantsTechniquesSection from '../components/form-sections/dgfip/EntrantsTechniquesSection';
import VolumetrieSection from '../components/form-sections/dgfip/VolumetrieSection';
import RecetteFonctionnelleSection from '../components/form-sections/dgfip/RecetteFonctionnelleSection';
import PreviousEnrollmentSection from '../components/form-sections/PreviousEnrollmentSection';
import OrganisationSection from '../components/form-sections/OrganisationSection';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      Votre demande d'habilitation pour accéder à l'API Impôt particulier a été
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

export const RecetteFonctionnelleDescription = () => (
  <div className="text-quote">
    <p>
      La demande d’entrée en production revêt un caractère définitif et entraîne
      le transfert de vos entrants techniques vers les exploitants informatiques
      de la DGFiP. Merci de vous assurer de la bonne valorisation de l'ensemble
      des informations demandées avant de procéder à cette demande. Votre entrée
      en production se fera lors du premier créneau disponible à compter de
      l'envoi des entrants techniques de production.
    </p>
  </div>
);

const ApiImpotParticulier = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.api_impot_particulier}`,
        alt: `Logo ${TARGET_API_LABELS.franceconnect}`,
        url: 'https://www.impots.gouv.fr/',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'recette-fonctionnelle', label: 'Recette fonctionnelle' },
        { id: 'homologation-securite', label: 'Homologation de sécurité' },
        { id: 'entrants-techniques', label: 'Entrants techniques' },
        { id: 'volumetrie', label: 'Volumétrie' },
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
        target_api="api_impot_particulier_step2"
        title="Demande d'accès à l'API Impôt particulier - étape 2 sur 2"
      >
        <DemarcheDescription />
        <PreviousEnrollmentSection
          previousTargetApi="api_impot_particulier"
          Description={PreviousEnrollmentDescription}
        />
        <OrganisationSection />
        <RecetteFonctionnelleSection />
        <HomologationSecuriteSection />
        <EntrantsTechniquesSection />
        <VolumetrieSection />
        <TextSection
          id="entree-en-production"
          title="Entrée en production"
          Description={RecetteFonctionnelleDescription}
        />
      </Form>
    </div>
  </div>
);

ApiImpotParticulier.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiImpotParticulier.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiImpotParticulier;
