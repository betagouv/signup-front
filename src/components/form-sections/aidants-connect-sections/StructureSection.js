import React, { useContext } from 'react';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import DocumentUpload from '../../DocumentUpload';

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
      <div className="form__group">
        <label htmlFor="intitule">Nom de la structure</label>
        <input
          type="text"
          onChange={onChange}
          name="intitule"
          id="intitule"
          readOnly={disabled}
          value={intitule}
        />
        <small className="card__meta">
          <i>Cette information peut être rendue publique.</i>
        </small>
      </div>
      <div className="form__group">
        <label htmlFor="additional_content.organization_address">
          Adresse de la structure, si différent de l’organisation
        </label>
        <input
          type="address"
          onChange={onChange}
          name="additional_content.organization_address"
          id="additional_content.organization_address"
          readOnly={disabled}
          value={organization_address}
        />
      </div>
      <div className="form__group">
        <label htmlFor="detailed-description">
          Description des missions de votre structure
        </label>
        <textarea
          rows="10"
          onChange={onChange}
          name="description"
          id="detailed-description"
          readOnly={disabled}
          value={description}
        />
      </div>
      <div className="form__group">
        <div className="text-quote">
          <p>
            Si vous avez une délégation de service public, merci de renseigner
            l'un des champs suivant :
          </p>
        </div>
      </div>
      <DocumentUpload
        label="Téléverser un document"
        disabled={disabled}
        uploadedDocuments={documents}
        documentsToUpload={documents_attributes}
        documentType={'Document::DelegationServicePublic'}
        handleChange={onChange}
      />
      <div className="form__group">
        <label htmlFor="additional_content.associated_public_organisation">
          Renseigner l'administration avec laquelle vous travaillez
        </label>
        <input
          type="associated_public_organisation"
          onChange={onChange}
          name="additional_content.associated_public_organisation"
          id="additional_content.associated_public_organisation"
          readOnly={disabled}
          value={associated_public_organisation}
        />
      </div>
    </ScrollablePanel>
  );
};

export default StructureSection;
