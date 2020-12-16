import React from 'react';
import FileInput from './FileInput';
import './OrInputStyle.css';

export const OrInput = ({
  uploadedDocuments,
  documentsToUpload,
  documentType,
  disabled,
  onChange,
  children,
  label,
}) => {
  return (
    <div id="or-input-form" className="form__group">
      <div>{children}</div>
      <div className="separator">
        <span>ou</span>
      </div>
      <div>
        <FileInput
          label={label}
          mimeTypes="*"
          disabled={disabled}
          uploadedDocuments={uploadedDocuments}
          documentsToUpload={documentsToUpload}
          documentType={documentType}
          handleChange={onChange}
        />
      </div>
    </div>
  );
};

export default OrInput;
