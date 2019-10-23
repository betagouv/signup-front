import React, { useContext } from 'react';
import DocumentUpload from '../../form/DocumentUpload';
import { ScrollablePanel } from '../../elements/Scrollable';
import { FormContext } from '../../Form';

const HomologationSecuriteSection = () => {
  const {
    disabled,
    onChange,
    onDocumentsChange,
    enrollment: {
      documents = [],
      documents_attributes = [],
      additional_content: {
        autorite_homologation_nom = '',
        autorite_homologation_fonction = '',
        date_homologation = '',
        date_fin_homologation = '',
      },
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="homologation-securite">
      <h2>Homologation de sécurité</h2>
      <div className="text-quote">
        <p>
          Le Référentiel Général de Sécurité (RGS 2.0) rend la démarche
          d’homologation obligatoire pour les SI relatifs aux échanges entre une
          autorité administrative et les usagers ou entre autorités
          administratives.
        </p>
        <p>
          Complétez les informations relatives à l’homologation et déposez la
          décision formelle d’homologation (également appelée attestation
          formelle).
        </p>
      </div>
      <br />
      <div className="form__group">
        <label htmlFor="autorite_homologation_nom">
          Nom de l’autorité d’homologation
        </label>
        <input
          type="text"
          onChange={onChange}
          name="additional_content.autorite_homologation_nom"
          id="autorite_homologation_nom"
          readOnly={disabled}
          value={autorite_homologation_nom}
        />
      </div>
      <div className="form__group">
        <label htmlFor="autorite_homologation_fonction">
          Fonction de l’autorité d’homologation
        </label>
        <input
          type="text"
          onChange={onChange}
          name="additional_content.autorite_homologation_fonction"
          id="autorite_homologation_fonction"
          readOnly={disabled}
          value={autorite_homologation_fonction}
        />
      </div>
      <div className="form__group">
        <label htmlFor="date_homologation">
          Date de début de l’homologation
        </label>
        <input
          type="date"
          onChange={onChange}
          name="additional_content.date_homologation"
          id="date_homologation"
          disabled={disabled}
          value={date_homologation}
        />
      </div>
      <div className="form__group">
        <label htmlFor="date_fin_homologation">
          Date de fin de l’homologation
        </label>
        <input
          type="date"
          onChange={onChange}
          name="additional_content.date_fin_homologation"
          id="date_fin_homologation"
          disabled={disabled}
          value={date_fin_homologation}
        />
      </div>

      <DocumentUpload
        disabled={disabled}
        uploadedDocuments={documents}
        documentsToUpload={documents_attributes}
        documentType={'Document::DecisionHomologation'}
        handleDocumentsChange={onDocumentsChange}
        label={"Décision d'homologation"}
      />
    </ScrollablePanel>
  );
};

export default HomologationSecuriteSection;
