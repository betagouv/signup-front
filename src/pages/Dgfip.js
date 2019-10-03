import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';
import DgfipRgpdAgreement from '../components/form/DgfipRgpdAgreement';
import TextSection from '../components/form-sections/TextSection';
import PreviousEnrollmentSection from '../components/form-sections/PreviousEnrollmentSection';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import DescriptionSection from '../components/form-sections/DescriptionSection';
import DonneesSection from '../components/form-sections/DonneesSection';
import CadreJuridiqueSection from '../components/form-sections/CadreJuridiqueSection';
import DonneesPersonnellesSection from '../components/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';
import CguSection from '../components/form-sections/CguSection';
import HomologationSecuriteSection from '../components/form-sections/dgfip/HomologationSecuriteSection';
import EntrantsTechniquesSection from '../components/form-sections/dgfip/EntrantsTechniquesSection';
import VolumetrieSection from '../components/form-sections/dgfip/VolumetrieSection';
import RecetteFonctionnelleSection from '../components/form-sections/dgfip/RecetteFonctionnelleSection';

import {
  CadreJuridiqueDescription,
  CguDescription,
  availableScopes,
  DonneesDescription,
  DemarcheDescription,
  cguLink,
} from './ApiImpotParticulier';

import { RecetteFonctionnelleDescription } from './ApiImpotParticulierStep2';

const target_api = 'dgfip';

const title = "Demande d'accès à l'API « Impôt particulier »";

const Dgfip = ({
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
        { id: 'description', label: 'Description' },
        { id: 'donnees', label: 'Données' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
        { id: 'donnees-personnelles', label: 'Données personnelles' },
        { id: 'contacts-moe', label: 'Mise en œuvre' },
        { id: 'cgu', label: "Modalités d'utilisation" },
        { id: 'homologation-securite', label: 'Homologation de sécurité' },
        { id: 'entrants-techniques', label: 'Entrants techniques' },
        { id: 'volumetrie', label: 'Volumétrie' },
        { id: 'recette-fonctionnelle', label: 'Recette fonctionnelle' },
      ]}
      contactInformation={[
        {
          email: 'contact@api.gouv.fr',
          label: 'Nous contacter',
          subject: 'Contact%20via%20signup.api.gouv.fr%20-%20DGFiP',
        },
      ]}
    />
    <div className="main">
      <Form enrollmentId={enrollmentId} target_api={target_api}>
        <TextSection title={title} Description={DemarcheDescription} />
        <PreviousEnrollmentSection />
        <OrganisationSection />
        <DescriptionSection />
        <DonneesSection
          availableScopes={availableScopes}
          AdditionalRgpdAgreement={DgfipRgpdAgreement}
          DonneesDescription={DonneesDescription}
        />
        <CadreJuridiqueSection
          CadreJuridiqueDescription={CadreJuridiqueDescription}
        />
        <DonneesPersonnellesSection />
        <MiseEnOeuvreSection />
        <CguSection cguLink={cguLink} CguDescription={CguDescription} />
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

Dgfip.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

Dgfip.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default Dgfip;
