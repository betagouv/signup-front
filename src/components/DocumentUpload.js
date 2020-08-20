import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DescriptionIcon from './icons/description';
import './DocumentUpload.css';

const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;

// NB: please keep this limit in sync with the limit in nginx signup-back configuration
const FILE_SIZE_LIMIT_IN_MB = 10;

const DocumentUpload = ({
  label,
  disabled,
  uploadedDocuments,
  documentsToUpload,
  documentType,
  handleChange,
}) => {
  const [documentsTooLargeError, setDocumentsTooLargeError] = useState(false);
  const [showDocumentDownloadLink, setShowDocumentDownloadLink] = useState(
    false
  );
  const [uploadedDocument, setUploadedDocument] = useState(null);

  const areDocumentsTooLarge = documentsToUpload => {
    const documentsSizeInMB = documentsToUpload.reduce(
      (accumulator, { attachment: { size } }) =>
        accumulator + size / 1024 / 1024, // in MB
      0
    );

    return documentsSizeInMB >= FILE_SIZE_LIMIT_IN_MB;
  };

  useEffect(() => {
    setDocumentsTooLargeError(areDocumentsTooLarge(documentsToUpload));
  }, [documentsToUpload]);

  useEffect(() => {
    setUploadedDocument(
      uploadedDocuments.filter(({ type }) => type === documentType)[0]
    );
  }, [uploadedDocuments, documentType]);

  useEffect(() => {
    setShowDocumentDownloadLink(
      uploadedDocuments.some(({ type }) => type === documentType) &&
        !documentsToUpload.some(({ type }) => type === documentType)
    );
  }, [uploadedDocuments, documentType, documentsToUpload]);

  const onChange = ({ target: { files, name } }) => {
    const documentsWithoutThisDocument = documentsToUpload.filter(
      ({ type }) => type !== documentType
    );

    const updatedDocumentsToUpload = [
      ...documentsWithoutThisDocument,
      {
        attachment: files[0],
        type: name,
      },
    ];

    // note that if files is an empty array (ie. file selection as been canceled)
    // this will result in unchanged documents_attributes
    return handleChange({
      target: {
        name: 'documents_attributes',
        value: updatedDocumentsToUpload,
      },
    });
  };

  const onCancelFile = () => {
    setUploadedDocument(null);
    setShowDocumentDownloadLink(false);
  };

  return (
    <div className="form__group">
      {showDocumentDownloadLink ? (
        <>
          <div>{label}</div>
          <div className="file-input">
            <button
              className="button download-button"
              // href={`${BACK_HOST + uploadedDocument.attachment.url}`}
            >
              <div className="download-button-icon">
                <DescriptionIcon color="var(--theme-primary)" />
              </div>
              <div className="download-button-label">
                {uploadedDocument.filename}
              </div>
            </button>
            {!disabled && (
              <button
                className="button cancel-file-button"
                onClick={onCancelFile}
                title="Changer le document"
                tooltip="Changer le document"
              >
                ×
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <label htmlFor={documentType}>{label}</label>
          <input
            type="file"
            accept=".pdf, application/pdf"
            onChange={onChange}
            disabled={disabled}
            name={documentType}
            id={documentType}
          />
          {documentsTooLargeError && (
            <div className="notification error">
              La taille des pièces jointes dépasse la taille maximale autorisée
              ({FILE_SIZE_LIMIT_IN_MB} MO)
            </div>
          )}
        </>
      )}
    </div>
  );
};

DocumentUpload.propTypes = {
  disabled: PropTypes.bool.isRequired,
  uploadedDocuments: PropTypes.arrayOf(
    PropTypes.shape({ type: PropTypes.string.isRequired })
  ).isRequired,
  documentsToUpload: PropTypes.arrayOf(
    PropTypes.shape({
      attachment: PropTypes.object.isRequired,
      type: PropTypes.string.isRequired,
      filename: PropTypes.string,
    })
  ).isRequired,
  documentType: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default DocumentUpload;
