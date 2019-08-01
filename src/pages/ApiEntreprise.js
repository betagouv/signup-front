import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';

// Description du contexte
const target_api = 'api_entreprise';
const title = "Demande d'accès à l'API Entreprise";

// Le demandeur doit décrire le contexte d'usage de l'API
const DemarcheDescription = () => (
  <div className="text-quote">
    <p>
      L'accès à l'API Entreprise n'est pour l'instant disponible que si vous
      êtes une administration. Pour accéder à l'API Entreprise, qui diffuse des
      données à caractère personnel, il doit vous être demandé de préciser le
      cadre juridique dans lequel vous souhaitez accéder à ces données.
    </p>
    <p>
      Décrivez brièvement votre service ainsi que l‘utilisation prévue des
      données transmises. C'est la raison pour laquelle vous traitez ces données
      qui peuvent inclure des données à caractère personnel.
    </p>
  </div>
);
const isFranceConnected = false;

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

// Le demandeur doit donner le SIRET de son organisme
// TODO : Nom du département, bureau ou service
// Le demandeur doit indiquer ses contacts
// Le demandeur doit donner le cadre juridique qui lui donne le droit d'accès à l'API
const CadreJuridiqueDescription = () => (
  <div className="text-quote">
    <p>
      Indiquez la référence ou l'URL du du fondement légal de votre droit à
      demander ces informations (délibération du conseil municipal, décret…). En
      cas de besoin, vous pouvez aussi joindre le document lui-même.
    </p>
  </div>
);

// Le demandeur doit séléctionner les données auxquelles il demande l'accès
// Les perimètres de données ne sont pas disponibles
// La ligne a été supprimée de la navigatrion {id: "#donnees", text: "Données"},
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

const availableScopes = [
  {
    name: 'associations',
    humanName: 'Association',
  },
  {
    name: 'attestations_agefiph',
    humanName: 'Attestation AGEFIPH',
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
    name: 'msa_cotisations',
    humanName: 'Cotisation MSA',
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
    name: 'documents_association',
    humanName: 'Document association',
  },
  {
    name: 'exercices',
    humanName: 'Exercice',
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
    name: 'entreprises',
    humanName: 'INSEE Entreprise',
  },
  {
    name: 'etablissements',
    humanName: 'INSEE Etablissement',
  },
  {
    name: 'liasse_fiscale',
    humanName: 'Liasse fiscale',
  },
];

// Le demandeur valide les modalités d'utilisation
const CguDescription = () => <React.Fragment />;
const cguLink = 'https://entreprise.api.gouv.fr/cgu/';

const ApiEntreprise = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      navLinksGeneral={[
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
          subject: 'Contact%20via%20signup.api.gouv.fr%20-%20API%20Entreprise',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api={target_api}
        title={title}
        DemarcheDescription={DemarcheDescription}
        isFranceConnected={isFranceConnected}
        contacts={contacts}
        CadreJuridiqueDescription={CadreJuridiqueDescription}
        DonneesDescription={DonneesDescription}
        availableScopes={availableScopes}
        CguDescription={CguDescription}
        cguLink={cguLink}
      />
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
