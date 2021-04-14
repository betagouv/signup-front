import React, { useContext } from 'react';
import { FormContext } from '../../../templates/Form';
import { ScrollablePanel } from '../../Scrollable';
import CheckboxInput from '../../../atoms/inputs/CheckboxInput';

export const LabelsSection = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      additional_content: {
        label_pass_numerique = false,
        label_france_services = false,
        label_fabrique_territoires = false,
        recrutement_conseiller_numerique = false,
      },
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="labels">
      <h2>Votre structure a obtenu</h2>
      <CheckboxInput
        label="Le label Pass Numérique"
        name="additional_content.label_pass_numerique"
        value={label_pass_numerique}
        disabled={disabled}
        onChange={onChange}
      />
      <CheckboxInput
        label="Le label France Services"
        name="additional_content.label_france_services"
        value={label_france_services}
        disabled={disabled}
        onChange={onChange}
      />
      <CheckboxInput
        label="Le label Fabrique des Territoires"
        name="additional_content.label_fabrique_territoires"
        value={label_fabrique_territoires}
        disabled={disabled}
        onChange={onChange}
      />
      <CheckboxInput
        label="Le recrutement de.s Conseiller.s Numérique.s"
        name="additional_content.recrutement_conseiller_numerique"
        value={recrutement_conseiller_numerique}
        disabled={disabled}
        onChange={onChange}
      />
    </ScrollablePanel>
  );
};

export default LabelsSection;
