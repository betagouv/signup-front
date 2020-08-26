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
    api_droits_cnam: 'contact@api.gouv.fr',
    api_entreprise: 'support@entreprise.api.gouv.fr',
    preuve_covoiturage: 'contact@covoiturage.beta.gouv.fr',
    le_taxi: 'contact@api.gouv.fr',
  };

  const subjects = {
    send_application: "Nous avons bien reçu votre demande d'accès",
    validate_application: 'Votre demande a été validée',
    review_application: 'Votre demande requiert des modifications',
    refuse_application: 'Votre demande a été refusée',
    notify_application_sent: 'Nouvelle demande sur Data Pass',
    create_application: 'Votre demande a été enregistrée',
    notify: 'Vous avez un nouveau message concernant votre demande',
  };

  return {
    senderAddress: senderAddresses[targetApi],
    subject: subjects[selectedAction],
  };
};

export const getMailHeader = (selectedAction, targetApi) => {
  let specificMailHeader = {
    notify: 'Vous avez un nouveau message concernant votre demande :',
    review_application:
      'Votre demande est incomplète et requiert les modifications suivantes :',
    refuse_application: 'Votre demande a été refusée pour la raison suivante :',
    validate_application:
      'Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès. Attention, ce courrier peut parfois passer en « courriers indésirables ».',
  }[selectedAction];

  const targetApiSpecificValidationMailHeader = {
    api_entreprise:
      "Votre demande a été validée. Vous allez recevoir un mail vous permettant de créer un mot de passe d'accès à l'interface (dashbord.entreprise.api.gouv.fr) qui vous permettra de récuperer votre token.",
    api_impot_particulier_fc_production:
      "Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès dans l'environnement de production.",
    api_impot_particulier_fc_sandbox: `Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès à l’API de test.
Vous pouvez dés à présent commencer à remplir la deuxième partie du formulaire dont la validation vous donnera accès à l’API de production : https://${
      window.location.host
    }/api-impot-particulier-fc-production`,
    api_impot_particulier_sandbox: `Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès à l’API de test.
Vous pouvez dés à présent commencer à remplir la deuxième partie du formulaire dont la validation vous donnera accès à l’API de production : https://${
      window.location.host
    }/api-impot-particulier-production`,
    api_particulier: `Votre demande a été validée.

Veuillez contacter votre responsable technique pour l'inviter à récupérer votre token sur le lien suivant : https://particulier.api.gouv.fr/dashboard
Veilliez à ce que lors de son inscription sur l'outil, votre contact technique utilise le même email que celui renseigné dans votre demande.`,
    api_r2p_production:
      "Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès dans l'environnement de production.",
    api_r2p_sandbox: `Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès à l’API de test.
Vous pouvez dés à présent commencer à remplir la deuxième partie du formulaire dont la validation vous donnera accès à l’API de production : https://${
      window.location.host
    }/api-r2p-production`,
  };

  if (
    selectedAction === 'validate_application' &&
    targetApiSpecificValidationMailHeader[targetApi]
  ) {
    specificMailHeader = targetApiSpecificValidationMailHeader[targetApi];
  }

  return `Bonjour,

${specificMailHeader}`;
};

export const getMailFooter = (selectedAction, targetApi) => {
  const teamName = TARGET_API_LABELS[targetApi];

  const specificMailFooter = {
    notify: '',
    review_application: `Merci d'apporter ces modifications directement sur votre demande en ligne.

`,
    refuse_application: '',
    validate_application: '',
  }[selectedAction];

  return `${specificMailFooter}Pour consulter cette demande, veuillez cliquer sur le lien suivant ${
    window.location.href.split('#')[0]
  } .

L'équipe ${teamName}
`;
};
