import React from 'react';

import { TARGET_API_LABELS } from '../../lib/api';
import NextSteps from './NextSteps';

const getWelcomeMessage = ({
  isOnNewEnrollmentPage,
  targetApi,
  TARGET_API_LABELS,
}) => {
  let message = '';
  if (isOnNewEnrollmentPage) {
    if (targetApi === 'franceconnect') {
      message =
        "Vous souhaitez intégrer le bouton d'identification FranceConnect à votre service en ligne";
    } else {
      message = `Vous souhaitez connecter votre service en ligne à « ${
        TARGET_API_LABELS[targetApi]
      } »`;
    }
    return `${message}, votre demande va se dérouler en 4 étapes :`;
  } else {
    if (TARGET_API_LABELS[targetApi]) {
      message = `Vous souhaitez suivre le traitement d'une demande d'habilitation à « ${
        TARGET_API_LABELS[targetApi]
      } »`;
    } else {
      message =
        "Vous souhaitez suivre le traitement d'une demande d'habilitation";
    }
    return `${message}, merci de vous identifier afin que nous puissions configurer vos accès.`;
  }
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
          <p>
            Pour faire une demande d'accès, allez sur{' '}
            <a href="https://api.gouv.fr/rechercher-api">api.gouv</a> et faites
            une demande à l'API de votre choix.
          </p>
        </>
      )}
      <div>
        <p className="call-to-action">{welcomeMessage}</p>
        {isOnNewEnrollmentPage && <NextSteps />}
      </div>
    </>
  );
};

export default WelcomeMessage;
