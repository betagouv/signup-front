import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/Form';
import Nav from '../components/Nav';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import DescriptionSection from '../components/form-sections/DescriptionSection';
import DonneesSection from '../components/form-sections/DonneesSection';
import CadreJuridiqueSection from '../components/form-sections/CadreJuridiqueSection';
import DonneesPersonnellesSection from '../components/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';
import CguSection from '../components/form-sections/CguSection';
import { sample } from 'lodash';

const contacts = {
  metier: {
    heading: 'Contact métier',
    description: () => (
      <p>
        Cette personne sera contactée en cas de problème fonctionnel sur votre
        service.
      </p>
    ),
    email: '',
    phone_number: '',
  },
  technique: {
    heading: 'Contact technique',
    description: () => (
      <p>
        Cette personne sera contactée en cas de problème technique sur votre
        service.
      </p>
    ),
    email: '',
    phone_number: '',
  },
};

const DonneesDescription = () => (
  <div className="text-quote">
    <p>
      Sélectionner ci-dessous les API qui sont strictement nécessaires pour
      cette démarche.
    </p>
    <p>
      Vous pouvez trouver une description détaillée de chaque API sur{' '}
      <a
        href="https://entreprise.api.gouv.fr/catalogue/"
        target="_blank"
        rel="noopener noreferrer"
      >
        entreprise.api.gouv.fr
      </a>
      .
    </p>
    <p>
      Pour mémoire, seuls les agents dûment habilités pour traiter cette
      démarche doivent pouvoir accéder aux données transmises.
    </p>
  </div>
);

// NB: this list is manually updated from https://dashboard.entreprise.api.gouv.fr/api/admin/roles
const availableScopes = [
  {
    value: 'entreprises',
    label: 'Données de référence d’une entité - INSEE & Inforgreffe',
  },
  {
    value: 'etablissements',
    label: 'Données de référence d’un établissement - INSEE',
  },
  {
    value: 'associations',
    label:
      'Informations déclaratives d’une association - Ministère de l’Intérieur',
  },
  {
    value: 'documents_association',
    label: 'Divers documents d’une association - Ministère de l’Intérieur',
  },
  {
    value: 'attestations_fiscales',
    label: 'Attestation fiscale - DGFIP',
  },
  {
    value: 'attestations_sociales',
    label: 'Attestation de vigilance - ACOSS',
  },
  {
    value: 'msa_cotisations',
    label: 'Cotisations de sécurité sociale agricole - MSA',
  },
  {
    value: 'attestations_agefiph',
    label: 'Conformité emploi des travailleurs handicapés - AGEFIPH',
  },
  {
    value: 'bilans_entreprise_bdf',
    label: '3 derniers bilans annuels - Banque de France',
  },
  {
    value: 'fntp_carte_pro',
    label: 'Carte professionnelle travaux publics - FNTP',
  },
  {
    value: 'certificat_cnetp',
    label: 'Cotisations congés payés & chômage intempéries - CNETP',
  },
  {
    value: 'certificat_opqibi',
    label: 'Certification de qualification d’ingénierie - OPQIBI',
  },
  {
    value: 'probtp',
    label: 'Cotisations retraite bâtiment - ProBTP',
  },
  {
    value: 'qualibat',
    label: 'Certification de qualification bâtiment - Qualibat',
  },
  {
    value: 'certificats_rge_ademe',
    label: 'Certificats RGE (ADEME)',
  },
  {
    value: 'extrait_court_inpi',
    label: 'Brevets, modèles et marques déposés - INPI',
  },
  {
    value: 'extraits_rcs',
    label: 'Extrait RCS - Infogreffe',
  },
  {
    value: 'actes_bilans_inpi',
    label: 'Actes et bilans annuels - INPI',
  },
  {
    value: 'liasse_fiscale',
    label: 'Déclarations de résultat - DGFIP',
  },
  {
    value: 'exercices',
    label: 'Chiffre d’affaires - DGFIP',
  },
  {
    value: 'conventions_collectives',
    label:
      'Conventions collectives - Fabrique numérique des Ministères Sociaux',
  },
];

const intitulePlaceholder = sample([
  '« Pré-remplissage du formulaire de création de compte des entreprise »',
  '« Simplification des demandes de subvention de la région »',
  "« Déclaration d'installation classée pour la protection de l'environnement »",
]);

const ApiEntreprise = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
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
          email: 'support@entreprise.api.gouv.fr',
          label: 'Contact mail',
          subject:
            'Contact%20via%20datapass.api.gouv.fr%20-%20API%20Entreprise',
        },
        {
          tel: '+33622814166',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="api_entreprise"
        title="Demande d'accès à l'API Entreprise"
      >
        <OrganisationSection />
        <DescriptionSection intitulePlaceholder={intitulePlaceholder} />
        <DonneesSection
          availableScopes={availableScopes}
          DonneesDescription={DonneesDescription}
        />
        <CadreJuridiqueSection />
        <DonneesPersonnellesSection />
        <MiseEnOeuvreSection initialContacts={contacts} />
        <CguSection cguLink="https://entreprise.api.gouv.fr/cgu/" />
      </Form>
    </div>
  </div>
);

ApiEntreprise.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiEntreprise.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiEntreprise;
