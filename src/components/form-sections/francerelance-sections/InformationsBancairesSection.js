import React, { useContext } from 'react';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import TextInput from '../../Form/components/TextInput';

export const InformationsBancairesSection = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      additional_content: { nom_beneficiaire = '', iban = '', bic = '' },
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="informations-bancaires">
      <h2>Informations bancaires</h2>
      <TextInput
        label="Nom du bénéficiaire à créditer"
        name="additional_content.nom_beneficiaire"
        value={nom_beneficiaire}
        disabled={disabled}
        onChange={onChange}
      />
      <TextInput
        label="Numéro IBAN"
        helper="L’IBAN (International Bank Account Number) est l’identifiant du compte bancaire."
        name="additional_content.iban"
        placeholder="FR** **** **** **** **** *******"
        value={iban}
        disabled={disabled}
        onChange={onChange}
      />
      <TextInput
        label="Code BIC"
        helper="Le code BIC (Bank Identifier Code) est l'identifiant international de la banque."
        name="additional_content.bic"
        value={bic}
        disabled={disabled}
        onChange={onChange}
      />
    </ScrollablePanel>
  );
};

export default InformationsBancairesSection;
