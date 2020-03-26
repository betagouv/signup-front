import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../lib/api';

import Form from '../components/Form';
import Nav from '../components/Nav';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import DescriptionSection from '../components/form-sections/DescriptionSection';
import CadreJuridiqueSection from '../components/form-sections/CadreJuridiqueSection';
import DonneesPersonnellesSection from '../components/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';
import CguSection from '../components/form-sections/CguSection';
import DonneesSection from '../components/form-sections/DonneesSection';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      Dans le cadre du programme « Dites-le nous une fois », visant à simplifier
      les démarches administratives des usagers, l’API Droits CNAM permet de
      récupérer des informations d'assurance maladie des usagers de façon à leur
      éviter la transmission d'information papier.
    </p>
    <p>
      Ce portail permet de faciliter le raccordement du téléservice des
      fournisseurs de service à l’API Droits CNAM.
    </p>
    <p>
      Pour faciliter votre racordement à l'API Droits CNAM, une{' '}
      <a
        href="https://github.com/assurance-maladie-digital/api-droits-fs-exemple-php"
        target="_blank"
        rel="noopener noreferrer"
      >
        API de test
      </a>{' '}
      est à votre disposition.
    </p>
  </div>
);

const availableScopes = [
  {
    value: 'cnam_beneficiaires',
    label: 'Liste des ayant-droits',
  },
  {
    value: 'cnam_contrats',
    label: 'Droits de base',
  },
  {
    value: 'cnam_caisse',
    label: 'Caisse gestionnaire',
  },
  {
    value: 'cnam_exonerations',
    label: 'Exonérations ou modulations éventuelles',
  },
  {
    value: 'cnam_medecin_traitant',
    label: 'Médecin traitant',
  },
  {
    value: 'cnam_presence_medecin_traitant',
    label: "Présence d'un médecin traitant",
  },
];

const useCases = [
  {
    label: 'Établissement de soin',
    scopes: [
      'cnam_beneficiaires',
      'cnam_caisse',
      'cnam_contrats',
      'cnam_exonerations',
      'cnam_medecin_traitant',
    ],
  },
  {
    label: 'Organisme complémentaire',
    scopes: [
      'cnam_beneficiaires',
      'cnam_caisse',
      'cnam_contrats',
      'cnam_presence_medecin_traitant',
    ],
  },
];

const ApiDroitsCnam = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.api_droits_cnam}`,
        alt: `Logo ${TARGET_API_LABELS.api_droits_cnam}`,
        url: 'https://www.ameli.fr/',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'description', label: 'Description' },
        { id: 'donnees', label: 'Données' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
        { id: 'donnees-personnelles', label: 'Données personnelles' },
        { id: 'contacts-moe', label: 'Mise en œuvre' },
        { id: 'cgu', label: "Modalités d'utilisation" },
      ]}
      contactInformation={[
        {
          email: 'contact@api.gouv.fr',
          label: 'Nous contacter',
          subject: 'Contact%20via%20signup.api.gouv.fr%20-%20CNAM',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="api_droits_cnam"
        steps={['franceconnect', 'api_droits_cnam']}
        title="Demande d'accès à l'API Droits CNAM"
        DemarcheDescription={DemarcheDescription}
      >
        <OrganisationSection />
        <DescriptionSection />
        <DonneesSection availableScopes={availableScopes} useCases={useCases} />
        <CadreJuridiqueSection />
        <DonneesPersonnellesSection />
        <MiseEnOeuvreSection />
        <CguSection cguLink="/docs/API_Droits_CNAM_CGU_20181210.pdf" />
      </Form>
    </div>
  </div>
);

ApiDroitsCnam.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiDroitsCnam.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiDroitsCnam;
