import React, { useContext } from 'react';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import CheckboxInput from '../../Form/components/CheckboxInput';

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
      <h2>Les financements obtenus par votre structure</h2>
      <p>Votre structure a obtenu :</p>
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
