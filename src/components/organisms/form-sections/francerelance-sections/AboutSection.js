import React, { useContext } from 'react';
import YesNoRadioInput from '../../../atoms/inputs/YesNoRadioInput';
import DateInput from '../../../atoms/inputs/DateInput';
import TextInput from '../../../atoms/inputs/TextInput';
import { FormContext } from '../../../templates/Form';
import { ScrollablePanel } from '../../Scrollable';

const SECTION_LABEL = 'À propos';
const SECTION_ID = encodeURIComponent(SECTION_LABEL);

export const AboutSection = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      additional_content: {
        utilisation_franceconnect_autre_projet = '',
        date_integration = '',
        type_de_depenses = '',
        code_ic = '',
      },
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId={SECTION_ID}>
      <h2>À propos</h2>
      <YesNoRadioInput
        label="Votre collectivité utilise-t-elle déjà FranceConnect pour d’autres de ses services en ligne ?"
        name="additional_content.utilisation_franceconnect_autre_projet"
        value={utilisation_franceconnect_autre_projet}
        disabled={disabled}
        onChange={onChange}
      />
      <DateInput
        label="A quelle date prévoyez-vous d’avoir achevé l’intégration de l’identification FranceConnect sur le service en ligne visé ?"
        name="additional_content.date_integration"
        value={date_integration}
        disabled={disabled}
        onChange={onChange}
      />
      <TextInput
        label="Indiquez les types de dépenses qui seront financées à travers la subvention accordée ?"
        name="additional_content.type_de_depenses"
        placeholder="paiement du prestataire, paiement de l’éditeur, etc."
        value={type_de_depenses}
        disabled={disabled}
        onChange={onChange}
      />
      <TextInput
        label="Renseignez votre code DGFIP IC"
        name="additional_content.code_ic"
        helper={'Identification du comptable public'}
        value={code_ic}
        disabled={disabled}
        onChange={onChange}
      />
    </ScrollablePanel>
  );
};

AboutSection.sectionLabel = SECTION_LABEL;

export default AboutSection;
