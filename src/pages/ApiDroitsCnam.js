import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';

// Description du contexte
const provider = 'api-droits-cnam';
const title = "Demande d'accès à l'API Droits CNAM";
const IntroDescription = () => (
  <div className="intro">
    <p>
      Dans le cadre du programme « Dites-le nous une fois », visant à simplifier
      les démarches administratives des usagers, l&apos;API Droits CNAM permet
      de récupérer des informations d'assurance maladie des usagers de façon à
      leur éviter la transmission d'information papier.
    </p>
    <p>
      Ce portail permet de faciliter le raccordement du téléservice des
      fournisseurs de service à l&apos;API Droits CNAM.
    </p>
    <p>
      Pour faciliter votre racordement à l'API Droits CNAM, une{' '}
      <a
        href="https://github.com/assurance-maladie-digital/api-droits-fs-exemple-php"
        target="_blank"
        rel="noopener noreferrer"
      >
        API de test
      </a>{' '}
      est à votre disposition.
    </p>
  </div>
);

// Le demandeur doit décrire le contexte d'usage de l'API
const DemarcheDescription = () => <React.Fragment />;
const isFranceConnected = true;

// Le demandeur doit donner le SIRET de son organisme
// Le demandeur doit indiquer ses contacts
// Le demandeur doit donner le cadre juridique qui lui donne le droit d'accès à l'API
const CadreJuridiqueDescription = () => <React.Fragment />;

// Le demandeur doit séléctionner les données auxquelles il demande l'accès
// Les perimètres de données ne sont pas disponibles
// La ligne a été supprimée de la navigatrion {id: "#donnees", text: "Données"},
const DonneesDescription = () => <React.Fragment />;
const availableScopes = [];

// Le demandeur valide les modalités d'utilisation
const CguDescription = () => <React.Fragment />;
const cguLink = "/docs/API_Droits_CNAM_CGU_20181210.pdf";

// Le demandeur doit remplir des contenus supplémentaires
const ContenusSupplementaires = () => <React.Fragment />;

const ApiDroitsCnam = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="documentation">
    <Nav
      navLinksGeneral = {[
      {id: "demarche", text: "Démarche"},
      {id: "identite", text: "Identité"},
      {id: "contacts", text: "Contacts"},
      {id: "cadre-juridique", text: "Cadre juridique"},
      {id: "cgu", text: "Modalités d'utilisation"},
      ]}
    />
    <div className="main-pane">
      <Form
        enrollmentId={enrollmentId}
        isCnam={true}
        provider={provider}
        title={title}
        IntroDescription={IntroDescription}
        DemarcheDescription={DemarcheDescription}
        isFranceConnected={isFranceConnected}
        CadreJuridiqueDescription={CadreJuridiqueDescription}
        DonneesDescription={DonneesDescription}
        availableScopes={availableScopes}
        CguDescription={CguDescription}
        cguLink={cguLink}
        ContenusSupplementaires={ContenusSupplementaires}
      />
    </div>
  </div>
);

ApiDroitsCnam.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiDroitsCnam.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiDroitsCnam;
