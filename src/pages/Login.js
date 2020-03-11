import React from 'react';
import { hashToQueryParams } from '../lib';
import './Login.css';
import { API_ICONS, TARGET_API_LABELS } from '../lib/api';

const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;

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

export const Login = () => {
  const loginUrl = `${BACK_HOST}/users/auth/api_gouv${hashToQueryParams({
    prompt: 'login',
  })}`;
  const createAccountUrl = `${BACK_HOST}/users/auth/api_gouv${hashToQueryParams(
    {
      prompt: 'create_account',
    }
  )}`;

  const targetApi = (window.location.pathname.split('/')[1] || '').replace(
    /-/g,
    '_'
  );

  const isOnNewEnrollmentPage =
    !!TARGET_API_LABELS[targetApi] && !window.location.pathname.split('/')[2];

  const welcomeMessage = getWelcomeMessage({
    isOnNewEnrollmentPage,
    targetApi,
    TARGET_API_LABELS,
  });

  const callToAction = isOnNewEnrollmentPage
    ? 'Merci de créer un compte pour déposer votre demande et suivre son traitement.'
    : 'Merci de vous identifier afin que nous puissions configurer vos accès.';

  return (
    <section className="section-grey section-full-page">
      <div className="container container-medium">
        <div className="panel" style={{ textAlign: 'center' }}>
          {API_ICONS[targetApi] && (
            <img
              src={`/images/${API_ICONS[targetApi]}`}
              alt={`Logo ${TARGET_API_LABELS[targetApi]}`}
              height="90"
            />
          )}
          <h3 className="login-title">Bienvenue !</h3>
          <p>{welcomeMessage}</p>
          <p>{callToAction}</p>
          <div className="login-buttons">
            {isOnNewEnrollmentPage ? (
              <>
                <a className="button-outline primary" href={loginUrl}>
                  Se connecter
                </a>
                <span className="login-buttons-or">ou</span>
                <a className="button primary" href={createAccountUrl}>
                  Créer un compte
                </a>
              </>
            ) : (
              <>
                <a className="button-outline primary" href={createAccountUrl}>
                  Créer un compte
                </a>
                <span className="login-buttons-or">ou</span>
                <a className="button primary" href={loginUrl}>
                  Se connecter
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
