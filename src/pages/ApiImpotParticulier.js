import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../lib/api';

import Form from '../components/Form';
import Nav from '../components/Nav';
import DgfipRgpdAgreement from '../components/form-sections/DonneesSection/DgfipRgpdAgreement';
import TextSection from '../components/form-sections/TextSection';
import DescriptionSection from '../components/form-sections/DescriptionSection';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import DonneesSection from '../components/form-sections/DonneesSection';
import CguSection from '../components/form-sections/CguSection';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';
import VolumetrieSection from '../components/form-sections/dgfip/VolumetrieSection';
import CadreJuridiqueSection from '../components/form-sections/CadreJuridiqueSection';
import { CadreJuridiqueDescription } from './ApiImpotParticulierStep2';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      Dans le cadre du programme « Dites-le nous une fois », visant à simplifier
      les démarches administratives des usagers, l’API Impôt particulier permet
      l’échange d’informations fiscales entre la DGFiP et une administration ou
      collectivité dans le cadre d’un téléservice. L’usager n'a plus besoin de
      transmettre son avis d’imposition.
    </p>
    <p>
      Ce portail vous permet en qualité de fournisseur de service de demander le
      raccordement de votre téléservice à l’API Impôt particulier.
    </p>
    <p>
      Pour cela, il vous est demandé de compléter le plus précisément possible
      les informations, en particulier pour ce qui concerne :
    </p>
    <ul>
      <li>les données nécessaires à la démarche administrative ;</li>
      <li>la volumétrie de sollicitation de l’API.</li>
    </ul>
    <p>
      Pour faciliter votre raccordement à l’API Impôt particulier, une API de
      test vous sera proposée après validation de cette première étape.
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
      nécessaires à votre téléservice.
    </p>
    <p>
      Le non-respect du principe de proportionnalité vous expose vis à vis de la
      CNIL.
    </p>
    <p>
      Des précisions sur les données proposées par l’API Impôt particulier sont
      disponibles sur{' '}
      <a
        href="/docs/Description_des_donnees_de_l_API_impot_particulier_081019.pdf"
        target="_blank"
        rel="noreferrer noopener"
      >
        ce document
      </a>
      .
    </p>
  </div>
);

DgfipRgpdAgreement.propTypes = {
  additional_content: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const groupTitle = 'Sélectionnez les années de revenus souhaitées :';

const availableScopes = [
  {
    value: 'dgfip_rfr',
    label: 'DGFiP - Revenu fiscal de référence (ou RFR)',
  },
  {
    value: 'dgfip_nbpart',
    label: 'DGFiP - nombre de parts',
  },
  {
    value: 'dgfip_aft',
    label: 'DGFiP - adresse fiscale de taxation au 1er janvier',
  },
  {
    value: 'dgfip_locaux_th',
    label: 'DGFiP - Données du local',
  },
  {
    value: 'dgfip_annee_n_moins_1',
    label: 'Dernière année de revenu',
    groupTitle,
  },
  {
    value: 'dgfip_annee_n_moins_2',
    label: 'Avant-dernière année de revenu',
    groupTitle,
  },
];

export const CguDescription = () => (
  <div className="text-quote">
    <p>
      Votre raccordement à l‘API Impôt particulier nécessite l‘acceptation des
      modalités d’utilisation.
    </p>
  </div>
);

export const cguLink =
  '/docs/conditions_generales_d_utilisation_de_l_api_impot_particulier_v3.pdf';

const SuiteDescription = () => (
  <div className="text-quote">
    <p>
      Après avoir cliqué sur « Soumettre la demande », les prochaines étapes
      sont :
    </p>
    <ol>
      <li>Le fournisseur de données de l’API va instruire la demande.</li>
      <li>
        En cours d’instruction, le fournisseur de données pourra vous demander
        par courriel des informations supplémentaires.
      </li>
      <li>
        Après instruction, vous serez informé par courriel de l’acceptation ou
        du refus de votre demande.
      </li>
    </ol>
    <p>En cas d’acceptation de votre demande :</p>
    <ul>
      <li>
        Le contact technique recevra par mail les informations nécessaires pour
        accéder à l’API de test.
      </li>
      <li>
        Vous recevrez par mail un lien vers un deuxième formulaire à remplir
        pour accéder à l’API de production.
      </li>
    </ul>
  </div>
);

const contacts = {
  technique: {
    heading: 'Responsable technique',
    description: () => (
      <p>
        Cette personne recevra les accès techniques par mail. Elle pourra
        également être contactée par téléphone pour faciliter le raccordement à
        l'API. Le responsable technique peut être le contact technique de votre
        prestataire.
      </p>
    ),
    family_name: '',
    given_name: '',
    email: '',
    phone_number: '',
  },
};

const steps = [
  'franceconnect',
  'api_impot_particulier',
  'api_impot_particulier_step2',
];

const ApiImpotParticulier = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.api_impot_particulier}`,
        alt: `Logo ${TARGET_API_LABELS.api_impot_particulier}`,
        url: 'https://www.impots.gouv.fr/',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'description', label: 'Description' },
        { id: 'volumetrie', label: 'Volumétrie' },
        { id: 'contacts-moe', label: 'Mise en œuvre' },
        { id: 'donnees', label: 'Données' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
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
        target_api="api_impot_particulier"
        steps={steps}
        title="Demande d’accès au bac à sable API Impôt particulier"
        DemarcheDescription={DemarcheDescription}
      >
        <OrganisationSection />
        <DescriptionSection />
        <VolumetrieSection />
        <MiseEnOeuvreSection initialContacts={contacts} />
        <DonneesSection
          availableScopes={availableScopes}
          AdditionalRgpdAgreement={DgfipRgpdAgreement}
          DonneesDescription={DonneesDescription}
        />
        <CadreJuridiqueSection
          CadreJuridiqueDescription={CadreJuridiqueDescription}
        />
        <CguSection cguLink={cguLink} CguDescription={CguDescription} />
        <TextSection Description={SuiteDescription} title="" />
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
