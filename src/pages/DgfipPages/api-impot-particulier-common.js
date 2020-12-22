import React from 'react';
import Quote from '../../components/Form/components/Quote';

export const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      Dans le cadre du programme « Dites-le nous une fois », visant à simplifier
      les démarches administratives des usagers, l’API Impôt particulier permet
      l’échange d’informations fiscales, dans le cadre d’un téléservice, entre
      la DGFiP et une entité administrative ou une entreprise dans le cadre de
      ses obligations légales et réglementaires pour des missions d’intérêt
      général. L’usager n'a plus besoin de transmettre les données fiscales déjà
      transmises à la DGFiP.
    </p>
    <p>
      Ce portail vous permet en qualité de fournisseur de services de demander
      le raccordement de votre téléservice à l’API Impôt particulier.
    </p>
    <p>
      Pour cela, il vous est demandé de compléter le plus précisément possible
      les informations demandées dans le formulaire de souscription en ligne, en
      particulier pour ce qui concerne :
    </p>
    <ul>
      <li>les données nécessaires à la démarche administrative ;</li>
      <li>la volumétrie de sollicitation de l’API ;</li>
      <li>le cadre juridique.</li>
    </ul>
    <p>
      Pour faciliter votre raccordement à l’API Impôt particulier, l’accès à un
      environnement de test (bac à sable) vous sera proposé après validation de
      cette première étape.
    </p>
  </div>
);

export const DemarcheDescriptionProduction = () => (
  <div className="notification grey">
    <p>
      Votre demande d'habilitation pour accéder à l'API « bac à sable » a été
      acceptée, vous pouvez maintenant construire votre démarche/téléservice en
      utilisant l'API exposée dans un environnement bac à sable. Parallèlement
      au développement, vous devez remplir les informations ci-dessous. Elles
      sont nécessaires pour obtenir l'habilitation de l'accès à l'API de
      production.
    </p>
  </div>
);

export const PreviousEnrollmentDescription = () => (
  <Quote>
    <p>
      Vous devez tout d'abord sélectionner la démarche que vous souhaitez
      poursuivre.
    </p>
  </Quote>
);

export const DonneesDescription = () => (
  <Quote>
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
  </Quote>
);

export const DonneesFootnote = () => (
  <div className="form__group">
    <small className="card__meta">
      <i>
        <a
          href="/docs/presentation_de_l_api_impot_particulier___v1.6.pdf"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Document pdf précisant les données proposées"
        >
          Ce document
        </a>{' '}
        présente les modalités d'appel et de réponse de l'API Impôt particulier,
        et décrit les données proposées.
      </i>
    </small>
  </div>
);

export const groupTitle = 'Sélectionnez les années de revenus souhaitées :';

export const availableScopes = [
  {
    value: 'dgfip_rfr',
    label: 'Revenu fiscal de référence (ou RFR)',
  },
  {
    value: 'dgfip_nbpart',
    label: 'Nombre de parts',
  },
  {
    value: 'dgfip_sitfam',
    label: 'Situation de famille',
  },
  {
    value: 'dgfip_nbpac',
    label: 'Nombre de personnes à charge',
  },
  {
    value: 'dgfip_aft',
    label: 'Adresse fiscale de taxation au 1er janvier',
  },
  {
    value: 'dgfip_locaux_th',
    label: 'Données du local',
  },
  {
    value: 'dgfip_annee_n_moins_1',
    label: 'Dernière année de revenu',
    groupTitle,
  },
  {
    value: 'dgfip_annee_n_moins_2',
    label: 'Avant-dernière année de revenu',
    groupTitle,
  },
  {
    value: 'dgfip_annee_n_moins_3',
    label: 'Avant-avant-dernière année de revenu',
    groupTitle,
  },
];

export const CadreJuridiqueDescription = () => (
  <Quote>
    <p>
      Pour pouvoir bénéficier du raccordement à l‘API Impôt particulier, le
      cadre légal et réglementaire des fournisseurs de service doit permettre à
      la DGFiP de transmettre des données fiscales à votre entité
      administrative.
    </p>
    <p>
      Conformément au Code des relations entre le public et l’administration,
      l’échange de données s’impose aux administrations dès lors que :
    </p>
    <ul>
      <li>
        ces données sont nécessaires au traitement d’une demande présentée par
        un usager ;
      </li>
      <li>
        l’administration destinataire est habilitée à connaître ces données dans
        le cadre de ses missions. (Article L114-8 1er alinéa modifié par LOI
        n°2016-1321 du 7 octobre 2016 - art. 91 )
      </li>
    </ul>
  </Quote>
);

export const CguDescription = () => (
  <Quote>
    <p>
      Votre raccordement à l‘API Impôt particulier nécessite l’acceptation des
      conditions générales d'utilisation.
    </p>
  </Quote>
);

export const SuiteDescription = () => (
  <Quote>
    <p>
      Après avoir cliqué sur « Soumettre la demande », les prochaines étapes
      sont :
    </p>
    <ol>
      <li>Le fournisseur de données de l’API va instruire la demande.</li>
      <li>
        En cours d’instruction, le fournisseur de données pourra vous demander
        par courriel des informations supplémentaires.
      </li>
      <li>
        Après instruction, vous serez informé par courriel de l’acceptation ou
        du refus de votre demande.
      </li>
    </ol>
    <p>En cas d’acceptation de votre demande :</p>
    <ul>
      <li>
        Le contact technique recevra par courriel les informations nécessaires
        pour accéder à l’environnement de test (bac à sable) de l’API.
      </li>
      <li>
        Vous recevrez par courriel un lien vers un deuxième formulaire à remplir
        afin d’accéder à l’environnement de production de l’API.
      </li>
    </ul>
  </Quote>
);

export const contacts = {
  technique: {
    heading: 'Responsable technique',
    description: (
      <p>
        Cette personne recevra les accès techniques par mail. Elle pourra
        également être contactée par téléphone pour faciliter le raccordement à
        l'API. Le responsable technique peut être le contact technique de votre
        prestataire.
      </p>
    ),
    family_name: '',
    given_name: '',
    email: '',
    phone_number: '',
  },
};
