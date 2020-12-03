import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/Form';
import Nav from '../components/Nav';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import DemarcheSection from '../components/form-sections/DemarcheSection';
import DescriptionSection from '../components/form-sections/DescriptionSection';
import DonneesSection from '../components/form-sections/DonneesSection';
import CadreJuridiqueSection from '../components/form-sections/CadreJuridiqueSection';
import CguSection from '../components/form-sections/CguSection';
import DonneesPersonnellesSection from '../components/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      Pour avoir accès à l’API Particulier, diffusant des données personnelles,
      vous devez obtenir un agrément. L’accès à cette API n’est pour l’instant
      disponible que si vous êtes&nbsp;:
    </p>
    <ul>
      <li>une administration</li>
      <li>
        une entreprise prestataire d’une administration ou ayant une délégation
        de service public
      </li>
    </ul>
    <p>
      Pour utiliser API Particulier, vous devez vous engager à traiter la bonne
      donnée par le bon agent de votre administration et informer correctement
      l’usager.
    </p>
  </div>
);

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
    heading: 'Responsable technique',
    description: () => (
      <p>
        Cette personne sera contactée en cas de problème technique sur votre
        service. Le responsable technique peut être le contact technique de
        votre prestataire.
      </p>
    ),
    email: '',
    phone_number: '',
  },
};

const CadreJuridiqueDescription = () => (
  <div className="text-quote">
    <p>
      Pour pouvoir bénéficier du raccordement à l&lsquo;API Particulier, le
      cadre légal et réglementaire des fournisseurs de service doit permettre à
      la DINUM de transmettre des données personnelles à votre entité
      administrative.
    </p>
  </div>
);

const DonneesDescription = () => (
  <div className="text-quote">
    <p>
      La loi informatique et libertés définit les principes à respecter lors de
      la collecte, du traitement et de la conservation de données personnelles.
    </p>
    <p>L’article 6 précise :</p>
    <ul>
      <li>
        3° [les données] sont adéquates, pertinentes et non excessives au regard
        des finalités pour lesquelles elles sont collectées et de leurs
        traitements ultérieurs ;
      </li>
      <li>
        4° Elles sont exactes, complètes et, si nécessaire, mises à jour ; les
        mesures appropriées doivent être prises pour que les données inexactes
        ou incomplètes au regard des finalités pour lesquelles elles sont
        collectées ou traitées soient effacées ou rectifiées ;
      </li>
    </ul>
    <p>
      Nous vous remercions de sélectionner uniquement les données strictement
      nécessaires à votre téléservice. Le non-respect du principe de
      proportionnalité vous expose vis à vis de la CNIL.
    </p>
  </div>
);

const availableScopes = [
  {
    value: 'dgfip_avis_imposition',
    label: "DGFIP - Avis d'imposition",
  },
  {
    value: 'dgfip_adresse',
    label: 'DGFIP - Adresse',
  },
  {
    value: 'cnaf_quotient_familial',
    label: 'CNAF - Quotient familial',
  },
  {
    value: 'cnaf_allocataires',
    label: 'CNAF - Allocataires',
  },
  {
    value: 'cnaf_enfants',
    label: 'CNAF - Enfants',
  },
  {
    value: 'cnaf_adresse',
    label: 'CNAF - Adresse',
  },
];

const demarches = {
  default: {
    label: 'Demande Libre',
    about: 'https://api.gouv.fr/les-api/api-particulier',
    state: {
      intitule: '',
      description: '',
      data_recipients: '',
      data_retention_period: '',
      fondement_juridique_title: '',
      fondement_juridique_url: '',
      scopes: {
        dgfip_avis_imposition: false,
        dgfip_adresse: false,
        cnaf_quotient_familial: false,
        cnaf_allocataires: false,
        cnaf_enfants: false,
        cnaf_adresse: false,
      },
    },
  },
  ccas: {
    label: "Dématérialisation de l'instruction des dossiers dans un CCAS",
    about: 'https://api.gouv.fr/guides/ccas',
    state: {
      scopes: {
        dgfip_avis_imposition: true,
        dgfip_adresse: true,
        cnaf_quotient_familial: true,
        cnaf_allocataires: true,
        cnaf_enfants: true,
        cnaf_adresse: false,
      },
    },
  },
  'ccas-arpege': {
    label:
      "Dématérialisation de l'instruction des dossiers dans un CCAS avec l’editeur Arpège",
    about: 'https://api.gouv.fr/guides/ccas',
    state: {
      intitule:
        'Récupération du Quotient Familial et des Impôts pour les aides sociales facultatives et les services à la personne du CCAS',
      description:
        'Le CCAS de notre commune module le montant des aides octroyées aux usagers en difficulté en fonction du QF.\nLe prix des services à la personne pour les aînés et personnes en situation de handicap est calculé en fonction de l’impôt sur le revenu.\nDans un esprit de simplification et de sécurité, nous souhaitons ne pas demander aux familles les informations de calcul mais plutôt nous baser sur les données proposées par API Particulier.\nNous utilisons le logiciel Sonate édité par la Société Arpège.',
      data_recipients:
        "agents instructeurs des demandes d'aides, agents instructeurs des demandes d'inscriptions aux services à la personne, ...",
      data_retention_period: '12',
      fondement_juridique_title:
        "Préciser ici les délibérations du conseil d'administration qui détaillent les modalités de calcul du montant des aides et/ou du prix de services.\nLorsque le calcul du montant des aides est à la libre appréciation du travailleur social ou de la commission d’attribution, préciser sur quels éléments se basent la décision.",
      fondement_juridique_url:
        'Joindre les délibérations ou procédures internes concernées.',
      scopes: {
        dgfip_avis_imposition: true,
        dgfip_adresse: false,
        cnaf_quotient_familial: true,
        cnaf_allocataires: false,
        cnaf_enfants: false,
        cnaf_adresse: false,
      },
    },
  },
  'ccas-up': {
    label:
      'Dématérialisation de l’instruction des dossiers dans un CCAS avec l’editeur Up',
    about: 'https://api.gouv.fr/guides/ccas',
    state: {
      intitule: 'Service d’actions sociales du CCAS',
      description: `Les agents sociaux de la collectivité (CCAS) instruisent des dossiers de demande d'aides légales et/ou facultatives. Dans ce contexte, ils ont besoin de connaître la composition familiale et la situation financière du foyer du demandeur : état civil (nom prénom date de naissance), structure familiale (nom prénom date de naissance des enfants et parents), adresse du foyer, quotient familial calculé par la CAF et les données fiscales de la DGFIP.

Toutes ces informations leur permettent de vérifier les conditions d'éligibilité aux aides sociales.

Ainsi, dans une volonté de simplification de la démarche pour les citoyens et agents, nous souhaitons exploiter les données déjà connues de l’API Particulier.

Pour cela, la collectivité utilise la solution Millésime édité par la société Cityzen du groupe Up.`,
      data_recipients: `Agents instructeurs des demandes d’aides et des demandes d’inscription.`,
      data_retention_period: 24,
      fondement_juridique_title: `Article L. 312-1 et Article R123-5 du code de l'action sociale et des familles.

Article L114-8 et Article R. 114-9-3 du code des relations entre le public et l’administration.`,
      scopes: {
        dgfip_avis_imposition: true,
        dgfip_adresse: false,
        cnaf_quotient_familial: true,
        cnaf_allocataires: true,
        cnaf_enfants: true,
        cnaf_adresse: true,
      },
    },
  },
  'pass-famille': {
    label: 'Pass Famille',
    about: 'https://api.gouv.fr/guides/portail-famille-pass-famille',
  },
  'petite-enfance': {
    label: 'Inscriptions à la crèche',
    about: 'https://api.gouv.fr/guides/portail-famille-petite-enfance',
  },
  'tarif-restauration-scolaire': {
    label: 'Tarification de la restauration scolaire',
    about:
      'https://api.gouv.fr/guides/portail-famille-tarif-restauration-scolaire',
    state: {
      scopes: {
        dgfip_avis_imposition: true,
        dgfip_adresse: true,
        cnaf_quotient_familial: true,
        cnaf_allocataires: true,
        cnaf_enfants: true,
        cnaf_adresse: false,
      },
    },
  },
  'tarif-activite-periscolaire': {
    label: 'Tarification des activités périscolaires et municipales',
    about:
      'https://api.gouv.fr/guides/portail-famille-tarif-activite-periscolaire',
    state: {
      scopes: {
        dgfip_avis_imposition: true,
        dgfip_adresse: true,
        cnaf_quotient_familial: true,
        cnaf_allocataires: false,
        cnaf_enfants: false,
        cnaf_adresse: false,
      },
    },
  },
};

const ApiParticulier = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'service-numerique', label: 'Service numérique' },
        { id: 'description', label: 'Description' },
        { id: 'donnees', label: 'Données' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
        { id: 'donnees-personnelles', label: 'Données personnelles' },
        { id: 'contacts-moe', label: 'Mise en œuvre' },
        { id: 'cgu', label: "Modalités d'utilisation" },
      ]}
      contactInformation={[
        {
          email: 'contact@particulier.api.gouv.fr',
          label: 'Nous contacter',
          subject: 'Contact%20via%20datapass.api.gouv.fr',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="api_particulier"
        title="Demande d'accès à API Particulier"
        DemarcheDescription={DemarcheDescription}
      >
        <OrganisationSection />
        <DemarcheSection demarches={demarches} />
        <DescriptionSection
          intitulePlaceholder={
            '« Calcul du quotient familial pour la facturation scolaire et périscolaire »'
          }
        />
        <DonneesSection
          availableScopes={availableScopes}
          DonneesDescription={DonneesDescription}
        />
        <CadreJuridiqueSection
          CadreJuridiqueDescription={CadreJuridiqueDescription}
        />
        <DonneesPersonnellesSection />
        <MiseEnOeuvreSection initialContacts={contacts} />
        <CguSection cguLink="https://particulier.api.gouv.fr/API_Particulier_modalites.pdf" />
      </Form>
    </div>
  </div>
);

ApiParticulier.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiParticulier.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiParticulier;
