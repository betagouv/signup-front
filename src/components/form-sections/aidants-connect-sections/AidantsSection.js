import React, { useContext } from 'react';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import YesNoRadioInput from '../../Form/components/YesNoRadioInput';
import NumberInput from '../../Form/components/NumberInput';

export const AidantsSection = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      additional_content: {
        nombre_aidants = '',
        utilisation_identifiants_usagers = null,
        demandes_par_semaines = '',
        teletravail_autorise = null,
        adresse_mail_professionnelle = null,
        telephone_portable_professionnel = null,
        ordinateur_professionnel = null,
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
        label="Les aidants réalisent-ils des démarches administratives à la place d’usagers (connexion avec les codes de l’usager) ?"
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
        label="Les aidants sont-ils autorisés à télétravailler et accompagner les usagers à distance ?"
        name="additional_content.teletravail_autorise"
        value={teletravail_autorise}
        disabled={disabled}
        onChange={onChange}
      />
      <YesNoRadioInput
        label="Les aidants à habiliter ont-ils bien une adresse mail professionnelle individuelle ?"
        name="additional_content.adresse_mail_professionnelle"
        value={adresse_mail_professionnelle}
        disabled={disabled}
        onChange={onChange}
      />
      <YesNoRadioInput
        label="Les aidants ont-ils à disposition un smartphone individuel pour s’identifier au service ? (en vue de l’installation d’une application d’authentification)"
        name="additional_content.telephone_portable_professionnel"
        value={telephone_portable_professionnel}
        disabled={disabled}
        onChange={onChange}
      />
      <YesNoRadioInput
        label="Les aidants ont-ils un ordinateur professionnel portable individuel ?"
        name="additional_content.ordinateur_professionnel"
        value={ordinateur_professionnel}
        disabled={disabled}
        onChange={onChange}
      />
    </ScrollablePanel>
  );
};

export default AidantsSection;
