import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';
import DgfipRgpdAgreement from '../components/form/DgfipRgpdAgreement';
import TextSection from '../components/form-sections/TextSection';
import DescriptionSection from '../components/form-sections/DescriptionSection';
import PreviousEnrollmentSection from '../components/form-sections/PreviousEnrollmentSection';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import DonneesSection from '../components/form-sections/DonneesSection';
import CguSection from '../components/form-sections/CguSection';
import CadreJuridiqueSection from '../components/form-sections/CadreJuridiqueSection';
import DonneesPersonnellesSection from '../components/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';

export const DemarcheDescription = () => (
  <div className="text-quote">
    <p>
      Dans le cadre du programme « Dites-le nous une fois », visant à simplifier
      les démarches administratives des usagers, l’API Impôt particulier permet
      l’échange d’informations fiscales entre la DGFiP et une administration ou
      collectivité dans le cadre d’un téléservice. L’usager FranceConnecté n'a
      plus besoin de transmettre son avis d’imposition.
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
      <li>le fondement juridique ;</li>
      <li>les données nécessaires à la démarche administrative ;</li>
      <li>la protection des données personnelles ;</li>
      <li>la volumétrie de sollicitation de l’API.</li>
    </ul>
    <p>
      Pour faciliter votre raccordement à l’API Impôt particulier, une API de
      test vous sera proposée après validation de cette première étape.
    </p>
  </div>
);

export const CadreJuridiqueDescription = () => (
  <div className="text-quote">
    <p>
      Pour pouvoir bénéficier du raccordement à l‘API Impôt particulier, le
      cadre légal et réglementaire des fournisseurs de service doit permettre à
      la DGFiP de transmettre des données fiscales à votre entité
      administrative.
    </p>
    <p>
      Conformément au Code des relations entre le public et l’administration,
      l’échange de données s’impose aux administrations dès lors que :
    </p>
    <ul>
      <li>
        ces données sont nécessaires au traitement d’une demande présentée par
        un usager ;
      </li>
      <li>
        l’administration destinataire est habilitée à connaître ces données dans
        le cadre de ses missions. (Article L114-8 1er alinéa modifié par LOI
        n°2016-1321 du 7 octobre 2016 - art. 91 )
      </li>
    </ul>
  </div>
);

export const DonneesDescription = () => (
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
        href="/docs/Description_des_donnees_de_l_API_impot_particulier.pdf"
        target="_blank"
        rel="noreferrer noopener"
      >
        ce document
      </a>
      .
    </p>
  </div>
);

const groupTitle = 'Sélectionnez les années de revenus souhaitées';

export const availableScopes = [
  {
    name: 'dgfip_rfr',
    humanName: 'DGFiP - Revenu fiscal de référence (ou RFR)',
  },
  {
    name: 'dgfip_nbpart',
    humanName: 'DGFiP - nombre de parts',
  },
  {
    name: 'dgfip_sitfam',
    humanName: 'DGFiP - situation de famille',
  },
  {
    name: 'dgfip_pac',
    humanName: 'DGFiP - composition du foyer fiscal',
  },
  {
    name: 'dgfip_aft',
    humanName: 'DGFiP - adresse fiscale de taxation au 1er janvier',
  },
  {
    name: 'dgfip_data_years_n_moins_1',
    humanName: 'Dernière année de revenu',
    groupTitle,
  },
  {
    name: 'dgfip_data_years_n_moins_2',
    humanName: 'Avant-dernière année de revenu',
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

export const SuiteDescription = () => (
  <div className="text-quote">
    <p>
      Pour pouvoir soumettre la demande, l’ensemble des champs obligatoires doit
      être renseigné. Compléter les champs facultatifs permet souvent une
      instruction plus rapide. Après avoir cliqué sur « Soumettre la demande »,
      les prochaines étapes sont :
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
    <p>
      Veuillez également noter qu'un mail est envoyé aux personnes que vous avez
      désigné comme responsable de traitement et comme délégué à la protection
      des données. Ce mail les informe qu'une demande les concernant a été
      faite.
    </p>
  </div>
);

export const cguLink =
  '/docs/API_impots_particulier_template_corps_juridique_avec_annexes.pdf';

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
        { id: 'description', label: 'Description' },
        { id: 'donnees', label: 'Données' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
        { id: 'donnees-personnelles', label: 'Données personnelles' },
        { id: 'contacts-moe', label: 'Mise en œuvre' },
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
      <Form enrollmentId={enrollmentId} target_api="api_impot_particulier">
        <TextSection
          title="Demande d’accès à l’API Impôt particulier - étape 1 sur 2"
          Description={DemarcheDescription}
        />
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
