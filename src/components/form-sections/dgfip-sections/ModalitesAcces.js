import React, { useContext } from 'react';

import { ScrollablePanel } from '../../Scrollable';
import { FormContext } from '../../Form';
import CheckboxInput from '../../Form/components/CheckboxInput';

export const ModalitesAcces = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      additional_content: { dgfip_acces_spi = '', dgfip_acces_etat_civil = '' },
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="modalites-acces">
      <h2>Modalités d'accès</h2>
      <CheckboxInput
        label="via le numéro fiscal (SPI) récupéré directement auprès de l'usager"
        name="additional_content.dgfip_acces_spi"
        value={dgfip_acces_spi}
        disabled={disabled}
        onChange={onChange}
      />
      <CheckboxInput
        label="via l'état civil de l'usager, saisi dans l'API R2P afin d'obtenir restitution du numéro fiscal (SPI)"
        helper="Merci de remplir une demande de souscription à l'API R2P"
        name="additional_content.dgfip_acces_etat_civil"
        value={dgfip_acces_etat_civil}
        disabled={disabled}
        onChange={onChange}
      />
    </ScrollablePanel>
  );
};
