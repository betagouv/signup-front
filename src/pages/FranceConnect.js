import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';
import FcHasAlternativeAuthenticationMethod from '../components/form/FcHasAlternativeAuthenticationMethod';

// Description du contexte
const provider = 'franceconnect';
const title = "Demande d'habilitation juridique à FranceConnect";
const DemarcheDescription = () => (
  <div className="text-quote">
    <p>
      Pour implémenter FranceConnect sur votre site en ligne, vous devez obtenir
      une habilitation. L&apos;accès à ce service n&apos;est pour l&apos;instant
      disponible que si vous êtes:
    </p>
    <ul>
      <li>une administration</li>
      <li>
        une entreprise prestataire d&apos;une administration ou ayant une
        délégation de service public
      </li>
      <li>
        un partenaire privé du service public de changement d'adresse en ligne :
        fournisseurs d'énergie, d'eau, opérateurs de communications
        électroniques et services postaux
      </li>
      <li>
        un organisme délivrant des prestations répondant à des obligations
        légales (assurances, banques)
      </li>
      <li>
        une entreprise proposant des services dont l'usage impose la
        vérification de l'identité ou d'un de ses attributs (majorité légale par
        exemple)
      </li>
    </ul>
    <p>
      À la clé ? La garantie de transactions sécurisées grâce au dispositif
      FranceConnect. Les utilisateurs quant à eux, gagneront en facilité d'accès
      à ces nouveaux services auxquels ils pourront se connecter via
      FranceConnect, sans avoir à créer un compte et un mot de passe.
    </p>
  </div>
);

const isFranceConnected = false;

// Le demandeur doit donner le SIRET de son organisme
// Le demandeur doit indiquer ses contacts
// Le demandeur doit donner le cadre juridique qui lui donne le droit d'accès à l'API
const CadreJuridiqueDescription = () => (
  <div className="text-quote">
    <p>
      Pour pouvoir bénéficier du raccordement à FranceConnect, le cadre légal et
      réglementaire qui s'applique à votre entité (administration ou entreprise)
      doit permettre à la DINSIC de lui transmettre des données d'identité.
    </p>
    <ul>
      <li>
        Si vous êtes une <b>administration</b>, vous pouvez citer ici{' '}
        <a href="https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000037611479&categorieLien=id">
          l'arrêté du 8 novembre 2018
        </a>
        . N'oubliez pas de justifier la nécessité d'identification de la
        personne dans le champs de description de votre démarche.{' '}
      </li>
      <li>
        Si vous êtes une <b>entreprise</b>, vous devez citer le cadre légal et
        réglementaire qui s'applique à votre entité.
      </li>
    </ul>
  </div>
);

// Le demandeur doit séléctionner les données auxquelles il demande l'accès
const DonneesDescription = () => <React.Fragment />;
const availableScopes = [
  {
    name: 'openid',
    humanName:
      "Identifiant technique (sub) de l'utilisateur au format OpenIDConnect",
    mandatory: true,
  },
  { name: 'gender', humanName: 'Sexe' },
  {
    name: 'birthdate',
    humanName: 'Date de naissance',
  },
  {
    name: 'birthcountry',
    humanName: 'Pays de naissance',
  },
  {
    name: 'birthplace',
    humanName: 'Ville de naissance',
  },
  {
    name: 'given_name',
    humanName: 'Prénoms',
  },
  {
    name: 'family_name',
    humanName: 'Nom de naissance',
  },
  {
    name: 'email',
    humanName: 'Adresse électronique',
  },
  {
    name: 'preferred_username',
    humanName: "Nom d'usage (information renvoyée si disponible)",
  },
  {
    name: 'address',
    humanName: 'Adresse postale (information renvoyée si disponible)',
  },
  {
    name: 'phone',
    humanName: 'Numéro de téléphone (information renvoyée si disponible)',
  },
];

// Le demandeur valide les modalités d'utilisation
const CguDescription = () => <React.Fragment />;
const cguLink = 'https://partenaires.franceconnect.gouv.fr/cgu';

const FranceConnect = ({
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
        { id: 'donnees', label: 'Données' },
        { id: 'cgu', label: "Modalités d'utilisation" },
      ]}
      contactInformation={[
        {
          email: 'support.usagers@franceconnect.gouv.fr',
          label: 'Particuliers, nous contacter',
          subject: 'Contact%20via%20signup.api.gouv.fr',
        },
        {
          email: 'support.partenaires@franceconnect.gouv.fr',
          label: 'Entreprises, nous contacter',
          subject: 'Contact%20via%20signup.api.gouv.fr',
        },
        {
          email: 'support.partenaires@franceconnect.gouv.fr',
          label: 'Administrations, nous contacter',
          subject: 'Contact%20via%20signup.api.gouv.fr',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        provider={provider}
        title={title}
        DemarcheDescription={DemarcheDescription}
        isFranceConnected={isFranceConnected}
        CadreJuridiqueDescription={CadreJuridiqueDescription}
        DonneesDescription={DonneesDescription}
        availableScopes={availableScopes}
        CguDescription={CguDescription}
        cguLink={cguLink}
        AdditionalContent={FcHasAlternativeAuthenticationMethod}
      />
    </div>
  </div>
);

FranceConnect.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

FranceConnect.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default FranceConnect;
