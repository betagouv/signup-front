import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';
import DgfipDataYears from '../components/form/DgfipDataYears';
import DgfipEntrantsTechniques from '../components/form/DgfipEntrantsTechniques';
import DgfipRgpdAgreement from '../components/form/DgfipRgpdAgreement';

// Description du contexte
const target_api = 'dgfip';

const title = "Demande d'accès à l'API « Impôt particulier »";

// Le demandeur doit décrire le contexte d'usage de l'API
const DemarcheDescription = () => (
  <div className="text-quote">
    <p>
      Dans le cadre du programme « Dites-le nous une fois », visant à simplifier
      les démarches administratives des usagers, l'API « Impôt particulier »
      permet l’échange d’informations fiscales entre la DGFiP et une
      administration ou collectivité dans le cadre d'un téléservice. L'usager
      FranceConnecté n'a plus besoin de transmettre son avis d'imposition.
    </p>
    <p>
      Ce portail vous permet en qualité de fournisseur de service de demander le
      raccordement de votre téléservice à l'API « Impôt particulier ».
    </p>
    <p>
      Pour cela, il vous est demandé de compléter le plus précisément possible
      les informations, en particulier pour ce qui concerne :
    </p>
    <ul>
      <li>le fondement juridique ;</li>
      <li>les données nécessaires à la démarche administrative ;</li>
      <li>la protection des données personnelles ;</li>
      <li>la volumétrie de sollicitation de l'API.</li>
    </ul>
    <p>
      Pour faciliter votre raccordement à l'API « Impôt particulier », une{' '}
      <a
        href="https://github.com/france-connect/service-provider-example/"
        target="_blank"
        rel="noopener noreferrer"
      >
        API de test
      </a>{' '}
      est à votre disposition.
    </p>
  </div>
);
const isFranceConnected = true;

const CadreJuridiqueDescription = () => (
  <div className="text-quote">
    <p>
      Pour pouvoir bénéficier du raccordement à l‘API « Impôt particulier », le
      cadre légal et réglementaire des fournisseurs de service doit permettre à
      la DGFiP de transmettre des données fiscales à votre entité
      administrative.
    </p>
    <p>
      Conformément au Code des relations entre le public et l'administration,
      l'échange de données s'impose aux administrations dès lors que :
    </p>
    <ul>
      <li>
        ces données sont nécessaires au traitement d'une demande présentée par
        un usager ;
      </li>
      <li>
        l'administration destinataire est habilitée à connaître ces données dans
        le cadre de ses missions. (Article L114-8 1er alinéa modifié par LOI
        n°2016-1321 du 7 octobre 2016 - art. 91 )
      </li>
    </ul>
  </div>
);

// Le demandeur doit séléctionner les données auxquelles il demande l'accès
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
      nécessaires à votre téléservice.
    </p>
    <p>
      Le non-respect du principe de proportionnalité vous expose vis à vis de la
      CNIL.
    </p>
    <p>
      Des précisions sur les données proposées par l'API impôt particulier sont
      disponibles sur{' '}
      <a
        href="/docs/Description_des_donnees_de_l_API_impot_particulier.pdf"
        target="_blank"
        rel="noreferrer noopener"
      >
        ce document
      </a>
      .
    </p>
  </div>
);

const availableScopes = [
  {
    name: 'dgfip_rfr',
    humanName: 'DGFiP - Revenu fiscal de référence (ou RFR)',
  },
  {
    name: 'dgfip_nbpart',
    humanName: 'DGFiP - nombre de parts',
  },
  {
    name: 'dgfip_sitfam',
    humanName: 'DGFiP - situation de famille',
  },
  {
    name: 'dgfip_pac',
    humanName: 'DGFiP - composition du foyer fiscal',
  },
  {
    name: 'dgfip_aft',
    humanName: 'DGFiP - adresse fiscale de taxation au 1er janvier',
  },
];

// Le demandeur valide les modalités d'utilisation
const CguDescription = () => (
  <div className="text-quote">
    <p>
      Votre raccordement à l‘API « Impôt particulier » nécessite l‘acceptation
      de la convention d‘adhésion fixant vos engagements et ceux de la DGFiP et
      la DINSIC. Les liens ci-dessous vous permettront de visualiser la
      convention type ainsi que ses annexes.
    </p>
  </div>
);
const cguLink =
  '/docs/API_impots_particulier_template_corps_juridique_avec_annexes.pdf';

const Dgfip = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: '/images/logo-dgfip.png',
        alt: 'Direction générale des finances publiques',
      }}
      navLinksGeneral={[
        { id: 'description', label: 'Description' },
        { id: 'donnees', label: 'Données' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
        { id: 'donnees-personnelles', label: 'Données personnelles' },
        { id: 'contacts-moe', label: 'Mise en œuvre' },
        { id: 'cgu', label: "Modalités d'utilisation" },
      ]}
      titleAdditionalContent={'Données de production'}
      navLinksAdditionalContent={[
        { id: 'homologation-securite', label: 'Homologation de sécurité' },
        { id: 'entrants-techniques', label: 'Entrants techniques' },
        { id: 'volumetrie', label: 'Volumétrie' },
        { id: 'recette-fonctionnelle', label: 'Recette fonctionnelle' },
      ]}
      contactInformation={[
        {
          email: 'contact@api.gouv.fr',
          label: 'Nous contacter',
          subject: 'Contact%20via%20signup.api.gouv.fr%20-%20DGFiP',
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
        // Le demandeur peut remplir des contenus supplémentaires
        AdditionalRgpdAgreement={DgfipRgpdAgreement}
        AdditionalDataContent={DgfipDataYears}
        AdditionalContent={DgfipEntrantsTechniques}
      />
    </div>
  </div>
);

Dgfip.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

Dgfip.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default Dgfip;
