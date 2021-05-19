// data in this file should be kept synced with back-end email template
// https://github.com/betagouv/signup-back/tree/master/app/views/enrollment_mailer
import { TARGET_API_LABELS } from './api';

export const getMailAttributes = (selectedAction, targetApi) => {
  const senderAddresses = {
    franceconnect: 'support.partenaires@franceconnect.gouv.fr',
    api_particulier: 'contact@particulier.api.gouv.fr',
    api_impot_particulier_sandbox: 'contact@api.gouv.fr',
    api_impot_particulier_production: 'contact@api.gouv.fr',
    api_impot_particulier_fc_sandbox: 'contact@api.gouv.fr',
    api_impot_particulier_fc_production: 'contact@api.gouv.fr',
    api_r2p_sandbox: 'contact@api.gouv.fr',
    api_r2p_production: 'contact@api.gouv.fr',
    api_ficoba_sandbox: 'contact@api.gouv.fr',
    api_ficoba_production: 'contact@api.gouv.fr',
    api_droits_cnam: 'contact@api.gouv.fr',
    api_entreprise: 'support@entreprise.api.gouv.fr',
    preuve_covoiturage: 'contact@covoiturage.beta.gouv.fr',
    le_taxi_clients: 'contact@api.gouv.fr',
    le_taxi_chauffeurs: 'contact@api.gouv.fr',
    cartobio: 'cartobio@beta.gouv.fr',
    aidants_connect: 'contact@aidantsconnect.beta.gouv.fr',
    hubee: 'contact@api.gouv.fr',
  };

  const subjects = {
    send_application: 'Nous avons bien reçu votre demande d’accès',
    validate_application: 'Votre demande a été validée',
    review_application: 'Votre demande requiert des modifications',
    refuse_application: 'Votre demande a été refusée',
    notify_application_sent: 'Nouvelle demande sur DataPass',
    create_application: 'Votre demande a été enregistrée',
    notify: 'Vous avez un nouveau message concernant votre demande',
  };

  return {
    senderAddress: senderAddresses[targetApi],
    subject: subjects[selectedAction],
  };
};

export const getMailHeader = (selectedAction, targetApi) => {
  let headerMessage = {
    notify: 'Vous avez un nouveau message concernant votre demande :',
    review_application:
      'Votre demande est incomplète et requiert les modifications suivantes :',
    refuse_application: 'Votre demande a été refusée pour la raison suivante :',
    validate_application:
      'Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès. Attention, ce courrier peut parfois passer en « courriers indésirables ».',
  }[selectedAction];

  const specificHeaderMessage = {
    validate_application: {
      api_entreprise:
        'Votre demande a été validée. Vous allez recevoir un mail vous permettant de créer un mot de passe d’accès à l’interface (dashbord.entreprise.api.gouv.fr) qui vous permettra de récuperer votre token.',
      api_impot_particulier_fc_production:
        'Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès dans l’environnement de production.',
      api_impot_particulier_fc_sandbox: `Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès à l’API de test.
Vous pouvez dés à présent commencer à remplir la deuxième partie du formulaire dont la validation vous donnera accès à l’API de production : https://${window.location.host}/api-impot-particulier-fc-production`,
      api_impot_particulier_sandbox: `Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès à l’API de test.
Vous pouvez dés à présent commencer à remplir la deuxième partie du formulaire dont la validation vous donnera accès à l’API de production : https://${window.location.host}/api-impot-particulier-production`,
      api_r2p_production:
        'Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès dans l’environnement de production.',
      api_r2p_sandbox: `Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès à l’API de test.
Vous pouvez dés à présent commencer à remplir la deuxième partie du formulaire dont la validation vous donnera accès à l’API de production : https://${window.location.host}/api-r2p-production`,
      api_ficoba_production:
        'Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès dans l’environnement de production.',
      api_ficoba_sandbox: `Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès à l’API de test.
Vous pouvez dés à présent commencer à remplir la deuxième partie du formulaire dont la validation vous donnera accès à l’API de production : https://${window.location.host}/api-ficoba-production`,
      cartobio:
        'Merci pour votre demande, vous trouverez les données en suivant ce(s) lien(s) :',
      aidants_connect:
        'Votre demande d’habilitation a été validée. Les aidants professionnels au sein de votre structure seront contactés très prochainement par courriel afin de suivre une formation à la prise en main d’Aidants Connect. Retrouvez dès maintenant tous les détails du processus d’habilitation sur notre page dédiée : https://aidantsconnect.beta.gouv.fr/habilitation .',
      hubee:
        'Votre demande d’abonnement a été validée et vous disposez désormais d’un compte d’Administrateur Local sur le Portail HubEE.',
    },
    refuse_application: {
      cartobio:
        'Je suis au regret de vous annoncer que votre demande d’accès aux données de Cartobio sur le territoire demandé à été refusée.',
    },
  };

  if (
    specificHeaderMessage[selectedAction] &&
    specificHeaderMessage[selectedAction][targetApi]
  ) {
    headerMessage = specificHeaderMessage[selectedAction][targetApi];
  }

  return `Bonjour,

${headerMessage}`;
};

export const getMailFooter = (selectedAction, targetApi) => {
  const teamName = TARGET_API_LABELS[targetApi];

  let footerMessage = {
    notify: '',
    review_application:
      'Merci d’apporter ces modifications directement sur votre demande en ligne.',
    refuse_application: '',
    validate_application: '',
  }[selectedAction];

  const specificFooterMessage = {
    validate_application: {
      cartobio: `**Plus d’information sur les données**
Les données les plus récentes sont celles de 2019, les données 2020 ne sont pas encore disponibles.

L’année 2019 référence à la fois les parcelles bio (propriété BIO=1) et conventionnelles (propriété BIO=0).
C'est également le cas pour 2017 et 2018, mais les parcelles conventionnelles sont partielles — uniquement pour des exploitations ayant au moins 1 parcelle bio.

Il s’agit de données anonymisées, c’est-à-dire que les informations concernant la personne physique ou morale qui cultive ces parcelles sont absentes.
Vous trouverez néanmoins les productions cultivées sur ces parcelles.

Il s’agit de données géographiques, lisibles avec des logiciels comme QGIS (https://qgis.org), Google Earth Pro (https://google.com/earth/versions/#earth-pro) ou encore le GéoPortail (geoportail.gouv.fr/tutoriels/ajoutez-vos-informations).

Ces données représentent 80 à 85% des parcelles labellisées en bio totales, il s’agit majoritairement de celles bénéficiant d’aides de la PAC.
Les dates et niveau de conversion ne sont pas disponibles. Nous travaillons à améliorer ces derniers points.

**Des précisions sur leur utilisation et diffusion**
Pour rappel, vous vous êtes engagé·e à _ne pas_ transmettre ces données.
Le fruit de votre analyse, si la source n’est pas exposée, peut quant à elle être mise à disposition du plus grand nombre.

Voici des ressources supplémentaires si besoin :

- les statistiques par commune et département sur https://www.agencebio.org/vos-outils/les-chiffres-cles/
- la couche "Registre Parcellaire Graphique" sur le Géoportail (https://www.geoportail.gouv.fr/donnees/registre-parcellaire-graphique-rpg-2019)


Afin d’évaluer et d’améliorer notre service, un questionnaire vous sera envoyé dans quelques semaines.
Cela nous permet de mieux comprendre si ces données sont satisfaisantes et à quels type d’analyse ou d’actions elles mènent.

Je suis disponible si vous avez des remarques ou questions.`,
      hubee: `Pour finaliser la procédure d’abonnement connectez-vous au Portail HubEE avec votre identifiant DataPass que vous avez créé lors de la demande d’abonnement (bouton en bas de la page de connexion):

Ensuite, rendez-vous dans le menu de gauche dans la rubrique « Abonnement », et sélectionnez votre abonnement dans la liste pour en finaliser le paramétrage, avec les options suivantes :

- Choix du mode d’accès aux données (API ou Portail).
Attention – le mode API ne peut être choisi que si votre commune dispose d’un logiciel métier en capacité de s’interfacer à HubEE. Veuillez contacter votre éditeur pour vous en assurer avant de faire ce choix.
Une fois ce choix fait, HubEE générera les crédentials (clientId/Clientsecret) que vous devrez copier/coller dans le logiciel métier.

- Choix de la date d’activation de l’abonnement
Si vous avez choisi le mode « Portail », n’oublier pas de créer les comptes des agents de votre commune avant cette date

- Choix du choix de l’activation de la notification par courriel lors de la mise à disposition de données et de sa fréquence (actif pour les 2 modes d’accès)

Nous vous conseillons également fortement de créer un deuxième compte d’administrateur local pour l’un de vos collègues.

Pour vous connecter au portail HubEE, un lien vous sera communiqué prochainement.
`,
    },
    refuse_application: {
      cartobio: `Voici néanmoins d’autres ressources ouvertes sur le sujet. Elles pourront peut-être vous aider :

- l’annuaire de l’Agence Bio : https://annuaire.agencebio.org/
- les statistiques par commune et département : https://www.agencebio.org/vos-outils/les-chiffres-cles/
- la couche "Registre Parcellaire Graphique" sur le Géoportail : https://www.geoportail.gouv.fr/`,
    },
  };

  if (
    specificFooterMessage[selectedAction] &&
    specificFooterMessage[selectedAction][targetApi]
  ) {
    footerMessage = specificFooterMessage[selectedAction][targetApi];
  }

  footerMessage = footerMessage
    ? `${footerMessage}

`
    : '';

  return `${footerMessage}Pour consulter cette demande, veuillez cliquer sur le lien suivant ${
    window.location.href.split('#')[0]
  } .

L’équipe ${teamName}
`;
};
