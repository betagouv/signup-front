import React from 'react';

import AuthIcon from '../../components/icons/auth';
import DemandeIcon from '../../components/icons/demande';
import HabilitationIcon from '../../components/icons/habilitation';
import TokenIcon from '../../components/icons/token';

const NextSteps = () => (
  <>
    <div className="next-steps">
      <div>
        <div>
          <AuthIcon />
        </div>
        <div>S’authentifier</div>
      </div>
      <div className="separator">⇢</div>
      <div>
        <div>
          <DemandeIcon />
        </div>
        <div>Remplir sa demande</div>
      </div>
      <div className="separator">⇢</div>
      <div>
        <div>
          <HabilitationIcon />
        </div>
        <div>Être habilité</div>
      </div>
      <div className="separator">⇢</div>
      <div>
        <div>
          <TokenIcon />
        </div>
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
