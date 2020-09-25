import React, { useContext } from 'react';
import { ScrollablePanel } from '../../Scrollable';
import { FormContext } from '../../Form';

const CartoBioAdditionalAgreements = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      additional_content: {
        secret_statistique_agreement = false,
        partage_agreement = false,
        protection_agreement = false,
        exhaustivite_agreement = false,
        information_agreement = false,
      },
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="cgu">
      <h2>Modalités d’utilisation</h2>
      <div className="form__group">
        <input
          onChange={onChange}
          disabled={disabled ? 'disabled' : false}
          checked={secret_statistique_agreement}
          type="checkbox"
          name="additional_content.secret_statistique_agreement"
          id="secret_statistique_agreement"
        />
        <label htmlFor="secret_statistique_agreement" className="label-inline">
          Je m'engage à respecter le secret statistique des données transmises
          lors d'une communication publique.
        </label>
      </div>
      <div className="form__group">
        <input
          onChange={onChange}
          disabled={disabled ? 'disabled' : false}
          checked={partage_agreement}
          type="checkbox"
          name="additional_content.partage_agreement"
          id="partage_agreement"
        />
        <label htmlFor="partage_agreement" className="label-inline">
          Je m'engage à partager les données uniquement au personnel de
          l'organisation que je représente.
        </label>
      </div>
      <div className="form__group">
        <input
          onChange={onChange}
          disabled={disabled ? 'disabled' : false}
          checked={protection_agreement}
          type="checkbox"
          name="additional_content.protection_agreement"
          id="protection_agreement"
        />
        <label htmlFor="protection_agreement" className="label-inline">
          Je m'engage à mettre en œuvre les mesures nécessaires pour éviter la
          divulgation des données à des tiers.
        </label>
      </div>
      <div className="form__group">
        <input
          onChange={onChange}
          disabled={disabled ? 'disabled' : false}
          checked={exhaustivite_agreement}
          type="checkbox"
          name="additional_content.exhaustivite_agreement"
          id="exhaustivite_agreement"
        />
        <label htmlFor="exhaustivite_agreement" className="label-inline">
          J'ai compris que les données transmises ne sont pas exhaustives, et ne
          représentent pas l'intégralité des surfaces cultivées en bio — les
          communications publiques et privées doivent en tenir compte et
          l'expliciter.
        </label>
      </div>
      <div className="form__group">
        <input
          onChange={onChange}
          disabled={disabled ? 'disabled' : false}
          checked={information_agreement}
          type="checkbox"
          name="additional_content.information_agreement"
          id="information_agreement"
        />
        <label htmlFor="information_agreement" className="label-inline">
          Je m'engage à tenir l'équipe CartoBio informée des productions
          établies avec les données géographiques — nous les mettrons en valeur
          pour stimuler une variété d'usages.
        </label>
      </div>
    </ScrollablePanel>
  );
};

export default CartoBioAdditionalAgreements;
