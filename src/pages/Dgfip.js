import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';
import DgfipDataYears from '../components/form/DgfipDataYears';
import DgfipEntrantsTechniques from '../components/form/DgfipEntrantsTechniques';

// Description du contexte
const provider = 'dgfip';

const title = "Demande d'accès à l'API « impôt particulier »";

const IntroDescription = () => (
  <div className="intro">
    <p>
      Dans le cadre du programme « Dites-le nous une fois », visant à simplifier
      les démarches administratives des usagers, l'API « impôt particulier »
      permet l’échange d’informations fiscales entre la DGFiP et une
      administration ou collectivité dans le cadre d'un téléservice. L'usager
      FranceConnecté n'a plus besoin de transmettre son avis d'imposition.
    </p>
    <p>
      Ce portail vous permet en qualité de fournisseur de service de demander le
      raccordement de votre téléservice à l'API « impôt particulier ».
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
      Pour faciliter votre raccordement à l'API « impôt particulier », une{' '}
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

// Le demandeur doit décrire le contexte d'usage de l'API
const DemarcheDescription = () => (
  <div className="information-text">
    <p>
      C'est la raison pour laquelle vous collectez des données personnelles,
      l'objectif qui est poursuivi par le téléservice que vous mettez en place.
    </p>
    <p>
      Par exemple, « télé-procédure permettant aux usagers de calculer le tarif
      de la cantine. »
    </p>
  </div>
);
const isFranceConnected = true;

// Le demandeur doit donner le SIRET de son organisme
// Le demandeur doit indiquer ses contacts
// Le demandeur doit donner le cadre juridique qui lui donne le droit d'accès à l'API
const CadreJuridiqueDescription = () => (
  <div className="information-text">
    <p>
      Pour pouvoir bénéficier du raccordement à l‘API « impôt particulier », le
      cadre légal et réglementaire des fournisseurs de service doit permettre à
      la DGFIP de transmettre des données fiscales à votre entité
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
  <div className="information-text">
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
      nécessaires à votre téléservice. Vous pouvez consulter le{' '}
      <a
        href="/docs/API_impots_particulier_template_corps_juridique_avec_annexes.pdf"
        target="_blank"
      >
        Contrat de Service Technique (CST)
      </a>{' '}
      pour voir le détail des données disponibles.
    </p>
    <p>
      Le non-respect du principe de proportionnalité vous expose vis à vis de la
      CNIL.
    </p>
    <p>
      <b>
        En poursuivant cette demande, j'atteste respecter les principes
        fondamentaux de la protection des données et avoir réalisé l'étude
        d'impact associée avant la mise en production de mon téléservice,
        conformément au règlement général sur la protection des données (RGPD)
        en vigueur depuis le 25 mai 2018.
      </b>
    </p>
  </div>
);

const availableScopes = [
  {
    name: 'dgfip_rfr',
    humanName: 'DGFIP - Revenu fiscal de référence (RFR)',
  },
  {
    name: 'dgfip_nbpart',
    humanName: 'DGFIP - nombre de parts',
  },
  {
    name: 'dgfip_sitfam',
    humanName: 'DGFIP - situation de famille',
  },
  {
    name: 'dgfip_pac',
    humanName: 'DGFIP - composition du foyer fiscal',
  },
  {
    name: 'dgfip_aft',
    humanName: 'DGFIP - adresse fiscale de taxation au 1er janvier',
  },
];

// Le demandeur valide les modalités d'utilisation
const CguDescription = () => (
  <div className="information-text">
    <p>
      Votre raccordement à l‘API « impôt particulier » nécessite l‘acceptation
      de la convention d‘adhésion fixant vos engagements et ceux de la DGFIP et
      la DINSIC. Les liens ci-dessous vous permettront de visualiser la
      convention type ainsi que ses annexes.
    </p>
  </div>
);
const cguLink =
  '/docs/API_impots_particulier_template_corps_juridique_avec_annexes.pdf';

// Le demandeur doit remplir des contenus supplémentaires
const AdditionalDataContent = DgfipDataYears;
const AdditionalContent = DgfipEntrantsTechniques;

const Dgfip = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="documentation">
    <Nav
      logo={{
        src: '/images/logo-dgfip.png',
        alt: 'Direction générale des finances publiques',
      }}
      navLinksGeneral={[
        { id: 'demarche', text: 'Démarche' },
        { id: 'identite', text: 'Identité' },
        { id: 'contacts', text: 'Contacts' },
        { id: 'cadre-juridique', text: 'Cadre juridique' },
        { id: 'donnees', text: 'Données' },
        { id: 'cgu', text: "Modalités d'utilisation" },
      ]}
      titleAdditionalContent={'Données de production'}
      navLinksAdditionalContent={[
        { id: 'homologation-securite', text: 'Homologation de sécurité' },
        { id: 'entrants-techniques', text: 'Entrants techniques' },
        { id: 'volumetrie', text: 'Volumétrie' },
        { id: 'recette-fonctionnelle', text: 'Recette fonctionnelle' },
      ]}
    />
    }
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
        AdditionalDataContent={AdditionalDataContent}
        AdditionalContent={AdditionalContent}
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
