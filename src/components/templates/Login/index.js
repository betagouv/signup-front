import React from 'react';
import { hashToQueryParams } from '../../../lib';
import './index.css';
import { API_ICONS, TARGET_API_LABELS } from '../../../lib/api';
import WelcomeMessage from './WelcomeMessage';
import ApiImpotParticulierFcSandboxWelcomeMessage from './ApiImpotParticulierFcSandboxWelcomeMessage';
import ApiImpotParticulierSandboxWelcomeMessage from './ApiImpotParticulierSandboxWelcomeMessage';
import ButtonLink from '../../atoms/ButtonLink';

const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;

const WelcomeMessageRouter = ({ targetApi, isOnNewEnrollmentPage }) => {
  if (!isOnNewEnrollmentPage) {
    return (
      <WelcomeMessage
        isOnNewEnrollmentPage={isOnNewEnrollmentPage}
        targetApi={targetApi}
      />
    );
  }
  switch (targetApi) {
    case 'api_impot_particulier_fc_sandbox':
      return <ApiImpotParticulierFcSandboxWelcomeMessage />;
    case 'api_impot_particulier_sandbox':
      return <ApiImpotParticulierSandboxWelcomeMessage />;
    case 'franceconnect':
      return (
        <WelcomeMessage
          isOnNewEnrollmentPage={isOnNewEnrollmentPage}
          targetApi={targetApi}
          newEnrollmentPageMessage="Vous souhaitez intégrer le bouton d’identification FranceConnect à votre service en ligne"
        />
      );
    case 'aidants_connect':
      return (
        <WelcomeMessage
          isOnNewEnrollmentPage={isOnNewEnrollmentPage}
          targetApi={targetApi}
          isService={true}
          newEnrollmentPageMessage="Vous souhaitez habiliter des aidants de votre structure à Aidants Connect"
        />
      );
    case 'hubee':
      return (
        <WelcomeMessage
          isOnNewEnrollmentPage={isOnNewEnrollmentPage}
          targetApi={targetApi}
          isService={true}
          newEnrollmentPageMessage="Vous souhaitez abonner votre structure à une démarche en ligne sur HubEE"
        />
      );
    default:
      return (
        <WelcomeMessage
          isOnNewEnrollmentPage={isOnNewEnrollmentPage}
          targetApi={targetApi}
        />
      );
  }
};

export const loginUrl = `${BACK_HOST}/users/auth/api_gouv${hashToQueryParams({
  prompt: 'login',
})}`;

export const createAccountUrl = `${BACK_HOST}/users/auth/api_gouv${hashToQueryParams(
  {
    prompt: 'create_account',
  }
)}`;

const LoginButtons = ({ isOnNewEnrollmentPage }) => (
  <div className="login-buttons">
    <ButtonLink
      className="button-outline primary"
      href={isOnNewEnrollmentPage ? loginUrl : createAccountUrl}
      referrerPolicy="no-referrer-when-downgrade"
    >
      {isOnNewEnrollmentPage ? 'Se connecter' : 'Créer un compte'}
    </ButtonLink>
    <span className="login-buttons-or">ou</span>
    <ButtonLink
      className="button primary"
      href={isOnNewEnrollmentPage ? createAccountUrl : loginUrl}
      referrerPolicy="no-referrer-when-downgrade"
    >
      {isOnNewEnrollmentPage ? 'Créer un compte' : 'Se connecter'}
    </ButtonLink>
  </div>
);

export const Login = () => {
  const targetApi = (window.location.pathname.split('/')[1] || '').replace(
    /-/g,
    '_'
  );

  const isOnNewEnrollmentPage =
    !!TARGET_API_LABELS[targetApi] && !window.location.pathname.split('/')[2];

  return (
    <section className="section-grey layout-full-page layout-center">
      <div className="container container-large">
        <div className="panel" style={{ textAlign: 'center' }}>
          {API_ICONS[targetApi] && (
            <img
              src={`/images/${API_ICONS[targetApi]}`}
              alt={`Logo ${TARGET_API_LABELS[targetApi]}`}
              height="90"
            />
          )}
          <WelcomeMessageRouter
            targetApi={targetApi}
            isOnNewEnrollmentPage={isOnNewEnrollmentPage}
          />
          <LoginButtons isOnNewEnrollmentPage={isOnNewEnrollmentPage} />
        </div>
      </div>
    </section>
  );
};
