import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';
import TextSection from '../components/form-sections/TextSection';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import DescriptionSection from '../components/form-sections/DescriptionSection';
import DonneesSection from '../components/form-sections/DonneesSection';
import CadreJuridiqueSection from '../components/form-sections/CadreJuridiqueSection';
import CguSection from '../components/form-sections/CguSection';
import DonneesPersonnellesSection from '../components/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';

const DemarcheDescription = () => (
  <div className="text-quote">
    <p>
      Pour avoir accès à l’API Particulier, diffusant des données personnelles,
      vous devez obtenir un agrément. L’accès à cette API n’est pour l’instant
      disponible que si vous êtes:
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
  technique: {
    heading: 'Responsable technique',
    description: () => (
      <p>
        Cette personne recevra les accès techniques par mail. Le numéro de
        téléphone doit être un numéro de téléphone mobile. Il sera utilisé pour
        envoyer un code d'accès. Le responsable technique peut être le contact
        technique de votre prestataire.
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
    name: 'dgfip_avis_imposition',
    humanName: "DGFIP - Avis d'imposition",
  },
  {
    name: 'dgfip_adresse',
    humanName: 'DGFIP - Adresse',
  },
  {
    name: 'cnaf_quotient_familial',
    humanName: 'CNAF - Quotient familial',
  },
  {
    name: 'cnaf_attestation_droits',
    humanName: 'CNAF - Attestation de droits',
  },
  {
    name: 'mesri_statut_etudiant',
    humanName: 'MESRI - Statut étudiant',
  },
];

const ApiParticulier = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      navLinks={[
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
          subject: 'Contact%20via%20signup.api.gouv.fr%20-%20API%20Particulier',
        },
      ]}
    />
    <div className="main">
      <Form enrollmentId={enrollmentId} target_api="api_particulier">
        <TextSection
          title="Demande d'accès à API Particulier"
          Description={DemarcheDescription}
        />
        <OrganisationSection />
        <DescriptionSection />
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
