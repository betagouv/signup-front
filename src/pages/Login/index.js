import React from 'react';
import { hashToQueryParams } from '../../lib';
import './index.css';
import { API_ICONS, TARGET_API_LABELS } from '../../lib/api';
import WelcomeMessage from './WelcomeMessage';
import ApiImpotParticulierWelcomeMessage from './ApiImpotParticulierWelcomeMessage';

const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;

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

  return (
    <section className="section-grey section-full-page">
      <div className="container container-large">
        <div className="panel" style={{ textAlign: 'center' }}>
          {API_ICONS[targetApi] && (
            <img
              src={`/images/${API_ICONS[targetApi]}`}
              alt={`Logo ${TARGET_API_LABELS[targetApi]}`}
              height="90"
            />
          )}
          {isOnNewEnrollmentPage && targetApi === 'api_impot_particulier' ? (
            <ApiImpotParticulierWelcomeMessage />
          ) : (
            <WelcomeMessage
              isOnNewEnrollmentPage={isOnNewEnrollmentPage}
              targetApi={targetApi}
            />
          )}
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
