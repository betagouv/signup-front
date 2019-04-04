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
    <b>
      Sélectionner ci-dessous les API qui sont strictement nécessaires pour
      cette démarche
    </b>
    <p>
      Vous pouvez trouver une description détaillée de chaque API ici :
      https://doc.entreprise.api.gouv.fr/
    </p>
    <b>
      Pour mémoire, seuls les agents dûment habilités pour traiter cette
      démarche doivent pouvoir accéder aux données transmises.
    </b>
  </div>
);
const availableScopes = [
  {
    name: 'association',
    humanName: 'Association',
  },
  {
    name: 'attestation_agefiph',
    humanName: 'Attestation AGEFIPH',
  },
  {
    name: 'attestation_fiscale',
    humanName: 'Attestation Fiscale',
  },
  {
    name: 'attestation_sociale',
    humanName: 'Attestation Sociale',
  },
  {
    name: 'bilans_entreprises_bdf',
    humanName: 'Bilans Entreprises BDF',
  },
  {
    name: 'carte_pro_fntp',
    humanName: 'Carte Pro FNTP',
  },
  {
    name: 'certificat_cnetp',
    humanName: 'Certificat CNETP',
  },
  {
    name: 'cotisation_msa',
    humanName: 'Cotisation MSA',
  },
  {
    name: 'certificat_opqibi',
    humanName: 'Certificat OPQIBI',
  },
  {
    name: 'certificat_probtp',
    humanName: 'Certificat PROBTP',
  },
  {
    name: 'certificat_qualibat',
    humanName: 'Certificat Qualibat',
  },
  {
    name: 'document_association',
    humanName: 'Document association',
  },
  {
    name: 'exercice',
    humanName: 'Exercice',
  },
  {
    name: 'extrait_inpi',
    humanName: 'Extrait INPI',
  },
  {
    name: 'extrait_rcs',
    humanName: 'Extrait RCS',
  },
  {
    name: 'insee_entreprise',
    humanName: 'INSEE Entreprise',
  },
  {
    name: 'insee_etablissement',
    humanName: 'INSEE Etablissement',
  },
  {
    name: 'liasse_fiscale',
    humanName: 'Liasse fiscale',
  },
];

// TODO : Je certifie que le Délégué à la Protection des Données de mon organisme est informé de ma demande *
// Le demandeur valide les modalités d'utilisation
const CguDescription = () => <React.Fragment />;
const cguLink = 'https://entreprise.api.gouv.fr/cgu/';

//TODO Informations complémentaires : Toute information susceptible de faciliter l'instruction de votre demande (volumétrie provisionnelle, saisonnalité, etc)
const ApiEntreprise = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      navLinksGeneral={[
        { id: 'demarche', label: 'Démarche' },
        { id: 'identite', label: 'Identité' },
        { id: 'contacts', label: 'Contacts' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
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
