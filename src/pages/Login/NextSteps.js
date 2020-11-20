import React from 'react';

export const login = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
  </svg>
);

export const fill = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path fill="none" d="M0 0L24 0 24 24 0 24z" />
    <path d="M20 2c.552 0 1 .448 1 1v3.757l-8.999 9-.006 4.238 4.246.006L21 15.242V21c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1V3c0-.552.448-1 1-1h16zm1.778 6.808l1.414 1.414L15.414 18l-1.416-.002.002-1.412 7.778-7.778zM12 12H7v2h5v-2zm3-4H7v2h8V8z" />
  </svg>
);

export const validation = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path fill="none" d="M0 0H24V24H0z" />
    <path d="M12 1l8.217 1.826c.457.102.783.507.783.976v9.987c0 2.006-1.003 3.88-2.672 4.992L12 23l-6.328-4.219C4.002 17.668 3 15.795 3 13.79V3.802c0-.469.326-.874.783-.976L12 1zm4.452 7.222l-4.95 4.949-2.828-2.828-1.414 1.414L11.503 16l6.364-6.364-1.415-1.414z" />
  </svg>
);

export const token = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M17 14h-4.341a6 6 0 1 1 0-4H23v4h-2v4h-4v-4zM7 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);

const NextSteps = () => (
  <>
    <div className="next-steps">
      <div>
        <div>{login}</div>
        <div>S’authentifier</div>
      </div>
      <div className="separator">⇢</div>
      <div>
        <div>{fill}</div>
        <div>Remplir sa demande</div>
      </div>
      <div className="separator">⇢</div>
      <div>
        <div>{validation}</div>
        <div>Être habilité</div>
      </div>
      <div className="separator">⇢</div>
      <div>
        <div>{token}</div>
        <div>Recevoir son token</div>
      </div>
    </div>
    <p>
      Merci de <b>créer un compte</b> pour déposer votre demande et suivre son
      traitement.
      <br /> Si vous possédez déja un compte, identifiez-vous.
    </p>
  </>
);

export default NextSteps;
