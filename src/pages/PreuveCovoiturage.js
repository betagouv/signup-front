import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';

const target_api = 'preuve_covoiturage';
const title = "Demande d'accès au Registre de preuve de covoiturage";

const DemarcheDescription = () => (
  <div className="text-quote">
    <p>
      L'accès au Registre de preuve de covoiturage est disponible pour les
      opérateurs de covoiturage et les autorités organisatrices de mobilité
      (AOM).
    </p>
    <p>
      Décrivez brièvement votre service ainsi que l‘utilisation prévue des
      données transmises. C'est la raison pour laquelle vous traitez ces données
      qui peuvent inclure des données à caractère personnel.
    </p>
  </div>
);
const isFranceConnected = false;

const availableScopes = [
  {
    name: 'operator',
    humanName: 'Opérateur de covoiturage',
  },
  {
    name: 'territory',
    humanName: 'Autorités organisatrices de mobilité (AOM)',
  },
];

const cguLink = 'https://registre-preuve-de-covoiturage.gitbook.io/produit/cgu';

const PreuveCovoiturage = ({
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
          email: 'contact@covoiturage.beta.gouv.fr',
          label: 'Nous contacter',
          subject: 'Contact%20via%20signup.api.gouv.fr',
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
        availableScopes={availableScopes}
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
