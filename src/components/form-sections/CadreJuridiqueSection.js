import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import DocumentUpload from '../form/DocumentUpload';
import { ScrollablePanel } from '../elements/Scrollable';
import { FormContext } from '../Form';

const CadreJuridiqueSection = ({ CadreJuridiqueDescription = () => null }) => {
  const {
    disabled,
    onChange,
    onDocumentsChange,
    enrollment: {
      fondement_juridique_title = '',
      fondement_juridique_url = '',
      documents = [],
      documents_attributes = [],
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="cadre-juridique">
      <h2>Le cadre juridique vous autorisant à traiter les données</h2>
      <CadreJuridiqueDescription />
      <br />
      <div className="form__group">
        <label htmlFor="fondement_juridique_title">
          Précisez la nature et, le cas échéant, les références du texte vous
          autorisant à traiter les données
        </label>
        <textarea
          rows="1"
          onChange={onChange}
          name="fondement_juridique_title"
          id="fondement_juridique_title"
          readOnly={disabled}
          value={fondement_juridique_title}
          placeholder="« loi », « décret », « délibération », etc."
        />
      </div>
      <div className="form__group">
        <label htmlFor="fondement_juridique_url">
          Si possible, joindre l'URL du texte relatif au traitement{' '}
          {fondement_juridique_url && (
            <span>
              (
              <a
                href={fondement_juridique_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                accéder à cette URL
              </a>
              )
            </span>
          )}
        </label>
        <input
          type="url"
          onChange={onChange}
          name="fondement_juridique_url"
          id="fondement_juridique_url"
          readOnly={disabled}
          value={fondement_juridique_url}
        />
      </div>
      <DocumentUpload
        label="Sinon, joindre le document lui même"
        disabled={disabled}
        uploadedDocuments={documents}
        documentsToUpload={documents_attributes}
        documentType={'Document::LegalBasis'}
        handleDocumentsChange={onDocumentsChange}
      />
    </ScrollablePanel>
  );
};

CadreJuridiqueSection.propTypes = {
  CadreJuridiqueDescription: PropTypes.func,
};

export default CadreJuridiqueSection;
