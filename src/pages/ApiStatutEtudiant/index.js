import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/Form';
import Nav from '../../components/Nav';
import OrganisationSection from '../../components/form-sections/OrganisationSection';
import DemarcheSection from '../../components/form-sections/DemarcheSection';
import DescriptionSection from '../../components/form-sections/DescriptionSection';
import DonneesSection from '../../components/form-sections/DonneesSection';
import CadreJuridiqueSection from '../../components/form-sections/CadreJuridiqueSection';
import CguSection from '../../components/form-sections/CguSection';
import DonneesPersonnellesSection from '../../components/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../../components/form-sections/MiseEnOeuvreSection';
import demarches from './demarches.json';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      L’API Statut étudiant simplifie les démarches des étudiants usagers et le
      processus de gestion de vos services. Il permet de disposer d’informations
      sur le statut étudiant des usagers dans le cadre de l’obtention d’un
      service proposé par votre administration ou votre entreprise prestataire
      d’une administration ou ayant une délégation de service public.
    </p>
  </div>
);

const contacts = {
  technique: {
    heading: 'Responsable technique',
    description: (
      <p>
        Cette personne recevra les accès techniques par mail. Elle sera
        contactée en cas de problème technique sur votre service. Le responsable
        technique peut être le contact technique de votre prestataire.
      </p>
    ),
    email: '',
    phone_number: '',
  },
};

const availableScopes = [
  {
    value: 'ine',
    label:
      'Identifiant national de l’étudiant-INE (réservé aux administrations du secteur de l’éducation)',
  },

  {
    value: 'identite',
    label: 'Données d’identité',
  },

  {
    value: 'inscription_statut_etudiant',
    label:
      'Données d’inscription sous statut étudiant (formation initiale, étudiant-apprenti)',
  },

  {
    value: 'inscription_autre_statuts',
    label:
      'Données d’inscription autres statuts (stagiaire formation continue ou contrat de professionnalisation)',
  },

  {
    value: 'admission',
    label: 'Données d’admission (inscription en cours)',
  },

  {
    value: 'etablissement',
    label: 'Données d’établissement',
  },
];

const ApiStatutEtudiant = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'modeles-preremplis', label: 'Modèles pré-remplis' },
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
          subject:
            'Contact%20via%20datapass.api.gouv.fr%20-%20API%20Statut%20étudiant',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="api_statut_etudiant"
        steps={['franceconnect', 'api_statut_etudiant']}
        title="Demande d'accès à l’API Statut étudiant"
        DemarcheDescription={DemarcheDescription}
        demarches={demarches}
      >
        <OrganisationSection />
        <DemarcheSection />
        <DescriptionSection />
        <DonneesSection availableScopes={availableScopes} />
        <CadreJuridiqueSection />
        <DonneesPersonnellesSection />
        <MiseEnOeuvreSection initialContacts={contacts} />
        <CguSection cguLink="" />
      </Form>
    </div>
  </div>
);

ApiStatutEtudiant.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiStatutEtudiant.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiStatutEtudiant;
