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
        membre_reseau = false,
      },
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="labels">
      <h2>Les labels obtenus par votre structure</h2>
      <CheckboxInput
        label="Labellisation Pass Numérique"
        name="additional_content.label_pass_numerique"
        value={label_pass_numerique}
        disabled={disabled}
        onChange={onChange}
      />
      <CheckboxInput
        label="Labellisation France Services"
        name="additional_content.label_france_services"
        value={label_france_services}
        disabled={disabled}
        onChange={onChange}
      />
      <CheckboxInput
        label="Labellisation Fabrique de Territoires"
        name="additional_content.label_fabrique_territoires"
        value={label_fabrique_territoires}
        disabled={disabled}
        onChange={onChange}
      />
      <CheckboxInput
        label="Participation à un réseau régional ou national (PIMMS, Emmaüs Connect…)"
        name="additional_content.membre_reseau"
        value={membre_reseau}
        disabled={disabled}
        onChange={onChange}
      />
    </ScrollablePanel>
  );
};

export default LabelsSection;
