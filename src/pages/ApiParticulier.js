import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';

// Description du contexte
const provider = "api-particulier";
const title = "Demande d'accès à API Particulier";

const IntroDescription = () => (
  <div className="intro">
    <p>
      Pour avoir accès à l&apos;API Particulier, diffusant des données
      personnelles, vous devez obtenir un agrément. L&apos;accès à cette API
      n&apos;est pour l&apos;instant disponible que si vous êtes:
    </p>
    <ul>
      <li>une administration</li>
      <li>
        une entreprise prestataire d&apos;une administration ou ayant une
        délégation de service public
      </li>
    </ul>
    <p>
      Pour utiliser API Particulier, vous devez vous engager à traiter la bonne
      donnée par le bon agent de votre administration et informer correctement
      l’usager.
    </p>
  </div>
);

// Le demandeur doit décrire le contexte d'usage de l'API
const DemarcheDescription = () => (
  <div className="information-text">
    <p>
      C&apos;est la raison pour laquelle vous collectez des données
      personnelles, l&apos;objectif qui est poursuivi par le traitement que vous
      mettez en place. Par exemple, « télé-procédure permettant aux usagers de
      demander une aide au paiement de la cantine des collégiens » ou «
      télé-procédure de demande de bourses de lycée ».
    </p>
  </div>
);
const isFranceConnected = false;

// Le demandeur doit donner le SIRET de son organisme
// Le demandeur doit indiquer ses contacts
// Le demandeur doit donner le cadre juridique qui lui donne le droit d'accès à l'API
const CadreJuridiqueDescription = () => (
  <div className="information-text">
    <p>
      Pour pouvoir bénéficier du raccordement à l&lsquo;API Particulier, le
      cadre légal et réglementaire des fournisseurs de service doit permettre à
      la DINSIC de transmettre des données fiscales à votre entité
      administrative.
    </p>
    <p>
      Il vous est donc demandé de préciser les références du fondement légal de
      votre droit à demander ces informations (délibération du conseil
      municipal, décret …).
    </p>
  </div>
);

// Le demandeur doit séléctionner les données auxquelles il demande l'accès
const DonneesDescription = () => (
  <section className="information-text">
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
  </section>
);

const availableScopes = [
    {
      "name": "dgfip_avis_imposition",
      "humanName": "DGFIP - Avis d'imposition"
    },
    {
      "name": "dgfip_adresse",
      "humanName": "DGFIP - Adresse"
    },
    {
      "name": "cnaf_quotient_familial",
      "humanName": "CNAF - Quotient familial"
    },
    {
      "name": "cnaf_attestation_droits",
      "humanName": "CNAF - Attestation de droits"
    }
  ];

// Le demandeur valide les modalités d'utilisation
const CguDescription = () => <React.Fragment />;
const cguLink = "https://particulier.api.gouv.fr/API_Particulier_modalites.pdf";

// Le demandeur doit remplir des contenus supplémentaires
const AdditionalContent = () => <React.Fragment />;

const ApiParticulier = ({
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
        {id: "donnees", text: "Données"},
        {id: "cgu", text: "Modalités d'utilisation"},
        ]}
    />
    <div className="main-pane">
      <Form
        enrollmentId={enrollmentId}
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
        AdditionalContent={AdditionalContent}
      />
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
