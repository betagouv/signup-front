import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';
import DgfipFormConfiguration from '../components/form/config/dgfip';

const IntroDescription = () => (
  <div className="intro">
    <p>
      Dans le cadre du programme « Dites-le nous une fois », visant à simplifier
      les démarches administratives des usagers, l&apos;API Impôt Particulier
      permet de récupérer des informations fiscales des usagers de façon à leur
      éviter la transmission de leur avis d&apos;imposition papier.
    </p>
    <p>
      Ce portail permet de faciliter le raccordement du téléservice des
      fournisseurs de service à l&apos;API Impôt Particulier.
    </p>
    <p>
      Pour cela, il vous sera demandé de compléter le plus précisément possible
      les informations sur :
    </p>
    <ul>
      <li>le fondement juridique</li>
      <li>les données nécessaires à la démarche administrative</li>
      <li>la volumétrie de sollicitation de l&apos;API</li>
      <li>la protection des données personnelles.</li>
    </ul>
    <p>
      Pour faciliter votre racordement à l'API Impôt Particulier, une{' '}
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

const CguDescription = () => (
  <div className="information-text">
    <p>
      Votre raccordement à l&lsquo;API Impôt Particulier nécessite
      l&lsquo;acceptation de la convention d&lsquo;adhésion fixant vos
      engagements et ceux de la DGFIP et la DINSIC. <br /> Les liens ci-dessous
      vous permettront de visualiser la convention type ainsi que ses annexes.{' '}
      <br /> La convention générée à l&lsquo;issue de votre demande de
      raccordement contiendra l&lsquo;ensemble des éléments propres à votre
      situation. <br /> Cette convention sera publiée sur api.gouv.fr et sera
      accessible via vos identifiants FranceConnect.
    </p>
  </div>
);

const CadreJuridiqueDescription = () => (
  <div className="information-text">
    <p>
      Pour pouvoir bénéficier du raccordement à l&lsquo;API Impôt Particulier,
      le cadre légal et réglementaire des fournisseurs de service doit permettre
      à la DGFIP de transmettre des données fiscales à votre entité
      administrative.
    </p>
    <p>
      Il vous est donc demandé de préciser les références du fondement légal de
      votre droit à demander ces informations (délibération du conseil
      municipal, décret …).
    </p>
  </div>
);

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
      nécessaires à votre téléservice. Le non-respect du principe de
      proportionnalité vous expose vis à vis de la CNIL.
    </p>
    <p>
      Vous pouvez consulter le{' '}
      <a
        href="/docs/API_impots_particulier_template_corps_juridique_avec_annexes.pdf"
        target="_blank"
      >
        Contrat de Service Technique (CST)
      </a>{' '}
      pour voir le détail des données disponibles.
    </p>
    <p>
      Si N représente l&apos;année de la demande et que j&apos;ai besoin de
      l&apos;information la plus fraîche : si mon usager fait la demande avant
      le mois d&apos;Aout, il faut que je demande le N-2; si mon usager fait la
      demande après, je demande le N-1.
    </p>
  </div>
);

const Dgfip = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="documentation">
    <Nav isDgfip={true} />
    <div className="main-pane">
      <Form
        enrollmentId={enrollmentId}
        form={DgfipFormConfiguration}
        isDgfip={true}
        IntroDescription={IntroDescription}
        DemarcheDescription={DemarcheDescription}
        CguDescription={CguDescription}
        CadreJuridiqueDescription={CadreJuridiqueDescription}
        DonneesDescription={DonneesDescription}
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
