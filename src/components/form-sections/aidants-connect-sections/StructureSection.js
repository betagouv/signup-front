import React, { useContext } from 'react';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import TextInput from '../../Form/components/TextInput';
import TextAreaInput from '../../Form/components/TextAreaInput';
import Quote from '../../Form/components/Quote';
import OrWrapper from '../../Form/components/OrWrapper';
import FileInput from '../../Form/components/FileInput';
import RadioInput from '../../Form/components/RadioInput';

export const StructureSection = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      intitule = '',
      description = '',
      documents = [],
      documents_attributes = [],
      additional_content: {
        organization_type = '',
        organization_address = '',
        associated_public_organisation = '',
      },
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="structure">
      <h2>Description de votre structure</h2>
      <TextInput
        label="Nom de la structure"
        meta="Cette information peut être rendue publique."
        name="intitule"
        value={intitule}
        disabled={disabled}
        onChange={onChange}
      />
      <RadioInput
        label="Type de structure"
        options={[
          { id: 'france-services', label: 'France Services' },
          { id: 'ccas', label: 'CCAS' },
          { id: 'collectivite', label: 'Collectivité' },
          { id: 'mediatheque', label: 'Médiathèque' },
          { id: 'association', label: 'Association' },
          { id: 'espace-public-numerique', label: 'Espace Public Numérique' },
          {
            id: 'structure-medicale',
            label: 'Structure médicale (CSAPA, CHU, CMS)',
          },
          { id: 'independant', label: 'Indépendant' },
        ]}
        name="additional_content.organization_type"
        value={organization_type}
        disabled={disabled}
        onChange={onChange}
      />
      <TextInput
        label="Adresse de la structure si différente de celle de l'organisation"
        name="additional_content.organization_address"
        value={organization_address}
        disabled={disabled}
        onChange={onChange}
      />
      <TextAreaInput
        label="Description des missions de votre structure"
        name="description"
        value={description}
        disabled={disabled}
        onChange={onChange}
      />
      <Quote>
        <p>
          Si vous travaillez avec une administration ou un établissement publics
          (prestation, délégation de service public, subvention publique, etc.),
          merci de renseigner l'un des champs suivants :
        </p>
      </Quote>
      <OrWrapper>
        <TextInput
          label="Renseigner l'administration avec laquelle vous travaillez"
          name="additional_content.associated_public_organisation"
          value={associated_public_organisation}
          disabled={disabled}
          onChange={onChange}
        />
        <FileInput
          label="Téléverser un document"
          documentType={'Document::DelegationServicePublic'}
          uploadedDocuments={documents}
          documentsToUpload={documents_attributes}
          disabled={disabled}
          handleChange={onChange}
        />
      </OrWrapper>
    </ScrollablePanel>
  );
};

export default StructureSection;
