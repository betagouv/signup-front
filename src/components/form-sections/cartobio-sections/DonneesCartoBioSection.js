import React, { useContext } from 'react';
import DocumentUpload from '../../DocumentUpload';
import { ScrollablePanel } from '../../Scrollable';
import { FormContext } from '../../Form';

const DonneesCartoBioSection = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      additional_content: { location_scopes = '' },
      documents = [],
      documents_attributes = [],
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="cartobio-donnees">
      <h2>Les périmètres de données dont vous avez besoin</h2>
      <br />
      <div className="form__group">
        <label htmlFor="location_scopes">
          Si possible, préciser le ou les code commune Insee, code EPCI, numéro
          de département, etc. du ou des périmètres de données nécessaires à
          votre cas d'usage :
        </label>
        <textarea
          rows="1"
          onChange={onChange}
          name="additional_content.location_scopes"
          id="location_scopes"
          readOnly={disabled}
          value={location_scopes}
          placeholder="« 93032,93077 », « 200054781,200054781 », « 93 », etc."
        />
      </div>
      <DocumentUpload
        label="Sinon, joindre les contours géographiques au format GeoJSON"
        mimeTypes="*"
        disabled={disabled}
        uploadedDocuments={documents}
        documentsToUpload={documents_attributes}
        documentType={'Document::GeoShape'}
        handleChange={onChange}
      />
    </ScrollablePanel>
  );
};

export default DonneesCartoBioSection;
