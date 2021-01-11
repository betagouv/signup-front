import React from 'react';

import { TARGET_API_LABELS } from '../../lib/api';
import NextSteps from './NextSteps';

const getWelcomeMessage = ({ isOnNewEnrollmentPage, targetApi }) => {
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
    return message;
  } else {
    if (TARGET_API_LABELS[targetApi]) {
      message = `Vous souhaitez suivre le traitement d'une demande d'habilitation à « ${
        TARGET_API_LABELS[targetApi]
      } »`;
    } else {
      message =
        "Vous souhaitez suivre le traitement d'une demande d'habilitation";
    }
    return message;
  }
};

const WelcomeMessage = ({ isOnNewEnrollmentPage, targetApi }) => {
  const message = getWelcomeMessage({
    isOnNewEnrollmentPage,
    targetApi,
  });

  return (
    <>
      {isOnNewEnrollmentPage ? (
        <h3>Bienvenue !</h3>
      ) : (
        <>
          <h3>Bienvenue sur DataPass !</h3>
          <p>
            Vous cherchez à accéder à des données protégées pour construire un
            service en ligne innovant, DataPass remplace les conventions et
            vous délivre un passe vers la donnée.{' '}
            <a href="https://github.com/betagouv/datapass#data-pass-anciennement-signup">
              En savoir plus
            </a>
          </p>
        </>
      )}
      <div className="call-to-action">
        {isOnNewEnrollmentPage ? (
          <>
            {message}, votre demande va se dérouler en 4 étapes :
            <NextSteps targetApi={targetApi} />
            <p>
              Merci de <b>créer un compte</b> pour déposer votre demande et
              suivre son traitement.
              <br /> Si vous possédez déja un compte, identifiez-vous.
            </p>
          </>
        ) : (
          <>
            {message}, merci de vous identifier afin que nous puissions
            configurer vos accès.
          </>
        )}
      </div>
    </>
  );
};

export default WelcomeMessage;
