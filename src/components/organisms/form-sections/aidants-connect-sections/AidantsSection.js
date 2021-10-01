import React, { useContext } from 'react';
import { FormContext } from '../../../templates/Form';
import { ScrollablePanel } from '../../Scrollable';
import FileInput from '../../../molecules/FileInput';

const SECTION_LABEL = 'Les aidants';
const SECTION_ID = encodeURIComponent(SECTION_LABEL);

export const AidantsSection = () => {
  const {
    disabled,
    onChange,
    enrollment: { documents = [], documents_attributes = [] },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId={SECTION_ID}>
      <h2>Les aidants</h2>
      <FileInput
        label={
          <>
            Liste des aidants à habiliter (
            <a href={`/docs/liste_des_aidants_a_habiliter.xlsx`} download>
              utilisez le modèle suivant
            </a>
            )
          </>
        }
        disabled={disabled}
        documentType={'Document::ListeAidants'}
        mimeTypes=".ods, .xls, .xlsx, .csv"
        uploadedDocuments={documents}
        onChange={onChange}
        documentsToUpload={documents_attributes}
      />
    </ScrollablePanel>
  );
};

AidantsSection.sectionLabel = SECTION_LABEL;

export default AidantsSection;
