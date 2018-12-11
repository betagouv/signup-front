import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';

const FranceConnectFormConfiguration = {
  provider: 'franceconnect',
  franceConnected: false,
  scopes: [
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
  ],
  cguLink: '/docs/Franceconnect_CGU_FS_v3.pdf',
  text: {
    title: "Demande d'accès à FranceConnect",
  },
};

const IntroDescription = () => (
  <div className="intro">
    <p>
      Pour avoir accès à FranceConnect, vous devez obtenir un agrément.
      L&apos;accès à ce service n&apos;est pour l&apos;instant disponible que si
      vous êtes:
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

const DemarcheDescription = () => (
  <div className="information-text">
    <p>
      C&apos;est la raison pour laquelle vous collectez des données à caractère
      personnel relatives à la gestion de l'identification, l&apos;objectif qui
      est poursuivi par le traitement que vous mettez en place. Par exemple, «
      se connecter au portail famille de ma ville » ou « accèder à son compte
      personnel de mutuelle ».
    </p>
  </div>
);

const CadreJuridiqueDescription = () => (
  <div className="information-text">
    <p>
      Pour pouvoir bénéficier du raccordement à FranceConnect, le cadre légal et
      réglementaire des fournisseurs de service doit permettre à la DINSIC de
      transmettre des données fiscales à votre entité administrative.
    </p>
    <p>
      Il vous est donc demandé de préciser les références du fondement légal de
      votre droit à demander ces informations (délibération du conseil
      municipal, décret …).
    </p>
  </div>
);

const DonneesDescription = () => <React.Fragment />;

const CguDescription = () => <React.Fragment />;

const FranceConnect = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="documentation">
    <Nav />
    <div className="main-pane">
      <Form
        enrollmentId={enrollmentId}
        form={FranceConnectFormConfiguration}
        IntroDescription={IntroDescription}
        DemarcheDescription={DemarcheDescription}
        CguDescription={CguDescription}
        CadreJuridiqueDescription={CadreJuridiqueDescription}
        DonneesDescription={DonneesDescription}
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
