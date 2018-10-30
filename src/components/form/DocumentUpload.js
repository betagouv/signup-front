import React from 'react';
import PropTypes from 'prop-types';

const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;

// NB: please keep this limit in sync with the limit in nginx signup-back configuration
const FILE_SIZE_LIMIT_IN_MB = 10;

class DocumentUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      documentsTooLargeError: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.documentsToUpload !== prevProps.documentsToUpload) {
      this.setState({
        documentsTooLargeError: this.areDocumentsTooLarge(
          this.props.documentsToUpload
        ),
      });
    }
  }

  areDocumentsTooLarge = documentsToUpload => {
    const documentsSizeInMB = documentsToUpload.reduce(
      (accumulator, { attachment: { size } }) =>
        accumulator + size / 1024 / 1024, // in MB
      0
    );

    return documentsSizeInMB >= FILE_SIZE_LIMIT_IN_MB;
  };

  onChange = ({ target: { files, name } }) => {
    const {
      documentsToUpload,
      documentType,
      handleDocumentsChange,
    } = this.props;

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

    this.setState({
      documentsTooLargeError: this.areDocumentsTooLarge(
        updatedDocumentsToUpload
      ),
    });

    return handleDocumentsChange(updatedDocumentsToUpload);
  };

  render() {
    const token = localStorage.getItem('token');
    const { documentsTooLargeError } = this.state;
    const { disabled, uploadedDocuments, documentType, label } = this.props;
    const uploadedDocument = uploadedDocuments.filter(
      ({ type }) => type === documentType
    )[0];

    return (
      <div className="form__group">
        {uploadedDocument ? (
          <label htmlFor={documentType}>
            <a
              href={`${BACK_HOST +
                uploadedDocument.attachment.url}?token=${token}`}
            >
              {label}
            </a>
          </label>
        ) : (
          <label htmlFor={documentType}>{label}</label>
        )}
        <input
          type="file"
          onChange={this.onChange}
          disabled={disabled}
          name={documentType}
          id={documentType}
        />
        {documentsTooLargeError && (
          <div className="notification error">
            La taille des pièces jointes dépasse la taille maximale autorisée (
            {FILE_SIZE_LIMIT_IN_MB} MO)
          </div>
        )}
      </div>
    );
  }
}

DocumentUpload.propTypes = {
  disabled: PropTypes.bool.isRequired,
  uploadedDocuments: PropTypes.arrayOf(
    PropTypes.shape({ type: PropTypes.string.isRequired })
  ).isRequired,
  documentsToUpload: PropTypes.arrayOf(
    PropTypes.shape({
      attachment: PropTypes.object.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  documentType: PropTypes.string.isRequired,
  handleDocumentsChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default DocumentUpload;
