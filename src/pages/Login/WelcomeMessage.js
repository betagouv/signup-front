import React from 'react';

import { TARGET_API_LABELS } from '../../lib/api';

const getWelcomeMessage = ({
  isOnNewEnrollmentPage,
  targetApi,
  TARGET_API_LABELS,
}) => {
  if (isOnNewEnrollmentPage && targetApi === 'franceconnect')
    return "Vous souhaitez intégrer le bouton d'identification FranceConnect à votre service en ligne.";

  if (isOnNewEnrollmentPage)
    return `Vous souhaitez connecter votre service en ligne à « ${
      TARGET_API_LABELS[targetApi]
    } ».`;

  if (TARGET_API_LABELS[targetApi])
    return `Vous souhaitez suivre le traitement d'une demande d'habilitation à « ${
      TARGET_API_LABELS[targetApi]
    } ».`;

  return "Vous souhaitez suivre le traitement d'une demande d'habilitation.";
};

const WelcomeMessage = ({ isOnNewEnrollmentPage, targetApi }) => {
  const welcomeMessage = getWelcomeMessage({
    isOnNewEnrollmentPage,
    targetApi,
    TARGET_API_LABELS,
  });

  return (
    <>
      <h3>Bienvenue !</h3>
      <p>{welcomeMessage}</p>
      <p className="call-to-action">
        {isOnNewEnrollmentPage
          ? 'Merci de créer un compte pour déposer votre demande et suivre son traitement.'
          : 'Merci de vous identifier afin que nous puissions configurer vos accès.'}
      </p>
    </>
  );
};

export default WelcomeMessage;
