import React, { useContext } from 'react';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import YesNoRadioInput from '../../Form/components/YesNoRadioInput';
import NumberInput from '../../Form/components/NumberInput';
import TextInput from '../../Form/components/TextInput';

export const AidantsSection = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      additional_content: {
        nombre_aidants = '',
        utilisation_identifiants_usagers = null,
        demandes_par_semaines = '',
        adresse_mail_professionnelle = null,
        participation_reseau = null,
        nom_reseau = '',
      },
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="aidants">
      <h2>Les aidants</h2>
      <NumberInput
        label="Nombre d’aidants à habiliter"
        name="additional_content.nombre_aidants"
        value={nombre_aidants}
        disabled={disabled}
        onChange={onChange}
      />
      <YesNoRadioInput
        label={
          <>
            Les aidants réalisent-ils des démarches administratives à la place
            d’usagers (connexion avec les codes de l’usager) ?
          </>
        }
        name="additional_content.utilisation_identifiants_usagers"
        value={utilisation_identifiants_usagers}
        disabled={disabled}
        onChange={onChange}
      />
      <NumberInput
        label="Si oui, combien de demandes par semaine ?"
        name="additional_content.demandes_par_semaines"
        value={demandes_par_semaines}
        disabled={disabled}
        onChange={onChange}
      />
      <YesNoRadioInput
        label={
          <>
            Les aidants à habiliter ont-ils bien une adresse mail
            professionnelle individuelle ?
          </>
        }
        name="additional_content.adresse_mail_professionnelle"
        value={adresse_mail_professionnelle}
        disabled={disabled}
        onChange={onChange}
      />
      <YesNoRadioInput
        label={
          <>
            Participez-vous à un réseau régional ou local (ex : PIMMS, EPN,
            etc.) ?
          </>
        }
        name="additional_content.participation_reseau"
        value={participation_reseau}
        disabled={disabled}
        onChange={onChange}
      />
      <TextInput
        label="Si oui, lequel ?"
        name="additional_content.nom_reseau"
        value={nom_reseau}
        disabled={disabled}
        onChange={onChange}
      />
    </ScrollablePanel>
  );
};

export default AidantsSection;
