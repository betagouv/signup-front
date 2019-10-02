import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';
import TextSection from '../components/form-sections/TextSection';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import DescriptionSection from '../components/form-sections/DescriptionSection';
import DonneesSection from '../components/form-sections/DonneesSection';
import CadreJuridiqueSection from '../components/form-sections/CadreJuridiqueSection';
import DonneesPersonnellesSection from '../components/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';
import CguSection from '../components/form-sections/CguSection';

const target_api = 'api_entreprise';
const title = "Demande d'accès à l'API Entreprise";

const DemarcheDescription = () => (
  <div className="text-quote">
    <p>
      L'accès à l'API Entreprise n'est pour l'instant disponible que si vous
      êtes une administration. Pour accéder à l'API Entreprise, qui diffuse des
      données à caractère personnel, il doit vous être demandé de préciser le
      cadre juridique dans lequel vous souhaitez accéder à ces données.
    </p>
    <p>
      <b>
        Attention, pour toute demande relative aux marchés publics, merci de
        contacter le support (
        <a href="mailto:support@entreprise.api.gouv.fr">
          support@entreprise.api.gouv.fr
        </a>
        ) avant de soumettre votre demande.
      </b>
    </p>
    <p>
      Décrivez brièvement votre service ainsi que l‘utilisation prévue des
      données transmises. C'est la raison pour laquelle vous traitez ces données
      qui peuvent inclure des données à caractère personnel.
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
      <a href="https://doc.entreprise.api.gouv.fr/">
        doc.entreprise.api.gouv.fr
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
    name: 'entreprises',
    humanName: 'INSEE Entreprise',
  },
  {
    name: 'etablissements',
    humanName: 'INSEE Etablissement',
  },
  {
    name: 'associations',
    humanName: 'Association',
  },
  {
    name: 'documents_association',
    humanName: 'Document association',
  },
  {
    name: 'attestations_fiscales',
    humanName: 'Attestation Fiscale',
  },
  {
    name: 'attestations_sociales',
    humanName: 'Attestation Sociale',
  },
  {
    name: 'msa_cotisations',
    humanName: 'Cotisation MSA',
  },
  {
    name: 'attestations_agefiph',
    humanName: 'Attestation AGEFIPH',
  },
  {
    name: 'bilans_entreprise_bdf',
    humanName: 'Bilans Entreprises BDF',
  },
  {
    name: 'fntp_carte_pro',
    humanName: 'Carte Pro FNTP',
  },
  {
    name: 'certificat_cnetp',
    humanName: 'Certificat CNETP',
  },
  {
    name: 'certificat_opqibi',
    humanName: 'Certificat OPQIBI',
  },
  {
    name: 'probtp',
    humanName: 'Certificat PROBTP',
  },
  {
    name: 'qualibat',
    humanName: 'Certificat Qualibat',
  },
  {
    name: 'certificat_rge_ademe',
    humanName: 'Certificats RGE (ADEME)',
  },
  {
    name: 'extrait_court_inpi',
    humanName: 'Extrait INPI',
  },
  {
    name: 'extraits_rcs',
    humanName: 'Extrait RCS',
  },
  {
    name: 'actes_bilans_inpi',
    humanName: 'Actes et Bilans INPI',
  },
  {
    name: 'liasse_fiscale',
    humanName: 'Liasse fiscale',
  },
  {
    name: 'exercices',
    humanName: 'Exercice',
  },
];

const cguLink = 'https://entreprise.api.gouv.fr/cgu/';

const ApiEntreprise = ({
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
          email: 'support@entreprise.api.gouv.fr',
          label: 'Contact mail',
          subject: 'Contact%20via%20signup.api.gouv.fr%20-%20API%20Entreprise',
        },
        {
          tel: '+33647457637',
        },
      ]}
    />
    <div className="main">
      <Form enrollmentId={enrollmentId} target_api={target_api}>
        <TextSection title={title} Description={DemarcheDescription} />
        <OrganisationSection />
        <DescriptionSection />
        <DonneesSection
          availableScopes={availableScopes}
          DonneesDescription={DonneesDescription}
        />
        <CadreJuridiqueSection />
        <DonneesPersonnellesSection />
        <MiseEnOeuvreSection initialContacts={contacts} />
        <CguSection cguLink={cguLink} />
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
