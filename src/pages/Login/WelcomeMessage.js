import React from 'react';

import { TARGET_API_LABELS } from '../../lib/api';

const getWelcomeMessage = ({
  isOnNewEnrollmentPage,
  targetApi,
  TARGET_API_LABELS,
}) => {
  if (isOnNewEnrollmentPage && targetApi === 'franceconnect')
    return "Vous souhaitez intégrer le bouton d'identification FranceConnect à votre service en ligne, ";

  if (isOnNewEnrollmentPage)
    return `Vous souhaitez connecter votre service en ligne à « ${
      TARGET_API_LABELS[targetApi]
    } », `;

  if (TARGET_API_LABELS[targetApi])
    return `Vous souhaitez suivre le traitement d'une demande d'habilitation à « ${
      TARGET_API_LABELS[targetApi]
    } », `;

  return "Vous souhaitez suivre le traitement d'une demande d'habilitation, ";
};

const WelcomeMessage = ({ isOnNewEnrollmentPage, targetApi }) => {
  const welcomeMessage = getWelcomeMessage({
    isOnNewEnrollmentPage,
    targetApi,
    TARGET_API_LABELS,
  });

  return (
    <>
      {isOnNewEnrollmentPage ? (
        <h3>Bienvenue !</h3>
      ) : (
        <>
          <h3>Bienvenue sur Data Pass !</h3>
          <p>
            Vous cherchez à accéder à des données protégées pour construire un
            service en ligne innovant, Data Pass remplace les conventions et
            vous délivre un passe vers la donnée.{' '}
            <a href="https://github.com/betagouv/datapass#data-pass-anciennement-signup">
              En savoir plus
            </a>
          </p>
        </>
      )}
      <p className="call-to-action">
        {welcomeMessage}
        {isOnNewEnrollmentPage
          ? 'merci de créer un compte pour déposer votre demande et suivre son traitement.'
          : 'merci de vous identifier afin que nous puissions configurer vos accès.'}
      </p>
    </>
  );
};

export default WelcomeMessage;
