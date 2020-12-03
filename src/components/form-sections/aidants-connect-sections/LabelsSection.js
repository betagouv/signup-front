import React, { useContext } from 'react';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';

export const LabelsSection = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      additional_content: {
        label_pass_numerique = false,
        label_france_services = false,
        label_fabrique_territoires = false,
        membre_reseau = false,
      },
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="labels">
      <h2>Les labels obtenus par votre structure</h2>
      <div className="form__group">
        <input
          onChange={onChange}
          disabled={disabled ? 'disabled' : false}
          checked={label_pass_numerique}
          type="checkbox"
          name="additional_content.label_pass_numerique"
          id="additional_content.label_pass_numerique"
        />
        <label
          htmlFor="additional_content.label_pass_numerique"
          className="label-inline"
        >
          Labellisation Pass Numérique
        </label>
      </div>
      <div className="form__group">
        <input
          onChange={onChange}
          disabled={disabled ? 'disabled' : false}
          checked={label_france_services}
          type="checkbox"
          name="additional_content.label_france_services"
          id="additional_content.label_france_services"
        />
        <label
          htmlFor="additional_content.label_france_services"
          className="label-inline"
        >
          Labellisation France Services
        </label>
      </div>
      <div className="form__group">
        <input
          onChange={onChange}
          disabled={disabled ? 'disabled' : false}
          checked={label_fabrique_territoires}
          type="checkbox"
          name="additional_content.label_fabrique_territoires"
          id="additional_content.label_fabrique_territoires"
        />
        <label
          htmlFor="additional_content.label_fabrique_territoires"
          className="label-inline"
        >
          Labellisation Fabrique de Territoires
        </label>
      </div>
      <div className="form__group">
        <input
          onChange={onChange}
          disabled={disabled ? 'disabled' : false}
          checked={membre_reseau}
          type="checkbox"
          name="additional_content.membre_reseau"
          id="additional_content.membre_reseau"
        />
        <label
          htmlFor="additional_content.membre_reseau"
          className="label-inline"
        >
          Participation à un réseau régional ou national (PIMMS, Emmaüs
          Connect…)
        </label>
      </div>
    </ScrollablePanel>
  );
};

export default LabelsSection;
