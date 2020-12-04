import React, { useContext } from 'react';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import FileInput from '../../Form/components/FileInput';
import TextInput from '../../Form/components/TextInput';
import TextAreaInput from '../../Form/components/TextAreaInput';
import Quote from '../../Form/components/Quote';

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
      <TextInput
        label="Adresse de la structure, si différent de l’organisation"
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
          Si vous avez une délégation de service public, merci de renseigner
          l'un des champs suivant :
        </p>
      </Quote>
      <FileInput
        label="Téléverser un document"
        documentType={'Document::DelegationServicePublic'}
        uploadedDocuments={documents}
        documentsToUpload={documents_attributes}
        disabled={disabled}
        handleChange={onChange}
      />
      <TextInput
        label="Renseigner l'administration avec laquelle vous travaillez"
        name="additional_content.associated_public_organisation"
        value={associated_public_organisation}
        disabled={disabled}
        onChange={onChange}
      />
    </ScrollablePanel>
  );
};

export default StructureSection;
