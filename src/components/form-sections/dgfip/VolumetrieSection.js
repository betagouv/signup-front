import React, { useContext, useEffect } from 'react';
import { ScrollablePanel } from '../../Scrollable';
import { FormContext } from '../../Form';

const VolumetrieSection = ({ options = [50, 200, 1000] }) => {
  const {
    disabled,
    isUserEnrollmentLoading,
    onChange,
    enrollment: {
      additional_content: { volumetrie_appels_par_minute = '' },
    },
  } = useContext(FormContext);

  useEffect(() => {
    // initialize volumetrie_appels_par_minute if needed
    if (
      !isUserEnrollmentLoading &&
      !disabled &&
      !volumetrie_appels_par_minute
    ) {
      onChange({
        target: {
          name: 'additional_content.volumetrie_appels_par_minute',
          value: options[0],
        },
      });
    }
  }, [
    options,
    isUserEnrollmentLoading,
    volumetrie_appels_par_minute,
    disabled,
    onChange,
  ]);

  return (
    <ScrollablePanel scrollableId="volumetrie">
      <h2>Volumétrie</h2>
      <div className="text-quote">
        <p>
          Connaître les données relatives à la volumétrie de votre téléservice
          nous permet de vous offrir la meilleure qualité de service possible.
          Ces informations sont transmises aux fournisseurs de vos données pour
          prévenir les pics de charges.
        </p>
        <p>
          Conformément aux modalités d’utilisation, nous nous réservons le droit
          de réduire ou couper les appels autorisés au fournisseur de service.
        </p>
      </div>
      <div className="form__group">
        <label htmlFor="nombre_demandes_annuelle">
          Quel est la limitation de debit que vous souhaitez pour votre
          téléservice&nbsp;?
        </label>
        <select
          onChange={onChange}
          name="additional_content.volumetrie_appels_par_minute"
          id="nombre_demandes_annuelle"
          value={volumetrie_appels_par_minute}
          disabled={disabled}
        >
          {options.map(appelsParMinute => (
            <option key={appelsParMinute} value={appelsParMinute}>
              {appelsParMinute} appels / minute
            </option>
          ))}
        </select>
      </div>
    </ScrollablePanel>
  );
};

export default VolumetrieSection;
