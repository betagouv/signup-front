import React, { useContext } from 'react';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import YesNoRadio from '../../Form/inputs/YesNoRadio';

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
      <div className="form__group">
        <label htmlFor="additional_content.nombre_aidants">
          Nombre d’aidants à habiliter
        </label>
        <input
          type="number"
          min="0"
          max="2147483647"
          onChange={onChange}
          name="additional_content.nombre_aidants"
          id="additional_content.nombre_aidants"
          disabled={disabled}
          value={nombre_aidants}
        />
      </div>
      <YesNoRadio
        label="Les aidants réalisent-ils des démarches administratives à la place d’usagers (connexion avec les codes de l’usager) ?"
        name="additional_content.utilisation_identifiants_usagers"
        disabled={disabled}
        value={utilisation_identifiants_usagers}
        onChange={onChange}
      />
      <div className="form__group">
        <label htmlFor="additional_content.demandes_par_semaines">
          Si oui, combien de demandes par semaine ?
        </label>
        <input
          type="number"
          min="0"
          max="2147483647"
          onChange={onChange}
          name="additional_content.demandes_par_semaines"
          id="additional_content.demandes_par_semaines"
          disabled={disabled}
          value={demandes_par_semaines}
        />
      </div>
      <YesNoRadio
        label="Les aidants sont-ils autorisés à télétravailler et accompagner les usagers à distance ?"
        name="additional_content.teletravail_autorise"
        disabled={disabled}
        value={teletravail_autorise}
        onChange={onChange}
      />
      <YesNoRadio
        label="Les aidants à habiliter ont-ils bien une adresse mail professionnelle individuelle ?"
        name="additional_content.adresse_mail_professionnelle"
        disabled={disabled}
        value={adresse_mail_professionnelle}
        onChange={onChange}
      />
      <YesNoRadio
        label="Les aidants ont-ils à disposition un smartphone individuel pour s’identifier au service ? (en vue de l’installation d’une application d’authentification)"
        name="additional_content.telephone_portable_professionnel"
        disabled={disabled}
        value={telephone_portable_professionnel}
        onChange={onChange}
      />
      <YesNoRadio
        label="Les aidants ont-ils un ordinateur professionnel portable individuel ?"
        name="additional_content.ordinateur_professionnel"
        disabled={disabled}
        value={ordinateur_professionnel}
        onChange={onChange}
      />
    </ScrollablePanel>
  );
};

export default AidantsSection;
