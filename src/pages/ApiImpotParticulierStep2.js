import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';
import TextSection from '../components/form-sections/TextSection';
import HomologationSecuriteSection from '../components/form-sections/dgfip/HomologationSecuriteSection';
import EntrantsTechniquesSection from '../components/form-sections/dgfip/EntrantsTechniquesSection';
import VolumetrieSection from '../components/form-sections/dgfip/VolumetrieSection';
import RecetteFonctionnelleSection from '../components/form-sections/dgfip/RecetteFonctionnelleSection';

const target_api = 'api_impot_particulier_step_2';

const title = "Demande d'accès à l'API « Impôt particulier » - étape 2 sur 2";

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
        src: '/images/logo-dgfip.png',
        alt: 'Direction générale des finances publiques',
      }}
      navLinks={[
        { id: 'homologation-securite', label: 'Homologation de sécurité' },
        { id: 'entrants-techniques', label: 'Entrants techniques' },
        { id: 'volumetrie', label: 'Volumétrie' },
        { id: 'recette-fonctionnelle', label: 'Recette fonctionnelle' },
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
      <Form enrollmentId={enrollmentId} target_api={target_api}>
        <TextSection Description={() => null} title={title} />
        <HomologationSecuriteSection />
        <EntrantsTechniquesSection />
        <VolumetrieSection />
        <RecetteFonctionnelleSection />
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
