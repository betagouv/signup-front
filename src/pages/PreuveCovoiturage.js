import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';

// Description du contexte
const target_api = 'preuve_covoiturage';
const title = "Demande d'accès au Registre de preuve de covoiturage";

// Le demandeur doit décrire le contexte d'usage de l'API
const DemarcheDescription = () => (
  <div className="text-quote">
    <p>
      L'accès au Registre de preuve de covoiturage est disponible pour les
      opérateurs de covoiturage et les autorités organisatrices de mobilité (AOM).
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
// const CadreJuridiqueDescription = () => (
//   <div className="text-quote">
//     <p>
//       Indiquez la référence ou l'URL du du fondement légal de votre droit à
//       demander ces informations (délibération du conseil municipal, décret…). En
//       cas de besoin, vous pouvez aussi joindre le document lui-même.
//     </p>
//   </div>
// );

// Le demandeur doit sélectionner les données auxquelles il demande l'accès
// Les perimètres de données ne sont pas disponibles
// La ligne a été supprimée de la navigatrion {id: "#donnees", text: "Données"},
const DonneesDescription = () => (
  <div className="text-quote">
    <b>
      Sélectionner le type d'accès au service en fonction de votre organisation.
    </b>
  </div>
);
const availableScopes = [
  {
    name: 'operator',
    humanName: 'Opérateur de covoiturage',
  },
  {
    name: 'territory',
    humanName: 'AOM',
  },
];

// TODO : Je certifie que le Délégué à la Protection des Données de mon organisme est informé de ma demande *
// Le demandeur valide les modalités d'utilisation
const CguDescription = () => <React.Fragment />;
const cguLink = 'https://registre-preuve-de-covoiturage.gitbook.io/produit/cgu';

//TODO Informations complémentaires : Toute information susceptible de faciliter l'instruction de votre demande (volumétrie provisionnelle, saisonnalité, etc)
const PreuveCovoiturage = ({
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
        // ??? Ajouter le contact de Preuve de Covoiturage
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

PreuveCovoiturage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

PreuveCovoiturage.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default PreuveCovoiturage;
