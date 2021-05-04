import React, { useContext } from 'react';
import { FormContext } from '../../../templates/Form';
import { ScrollablePanel } from '../../Scrollable';
import Quote from '../../../atoms/inputs/Quote';
import FileInput from '../../../molecules/FileInput';

export const CguSection = () => {
  const {
    disabled,
    onChange,
    enrollment: { documents = [], documents_attributes = [] },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="CguSection">
      <h2>Modalités d’utilisation</h2>
      <Quote>
        <p>
          Afin de vérifier que vous êtes en pleine connaissance de vos
          obligations fiscales (paiement de la TVA et de l’impôt sur le revenu
          ou sur les sociétés selon votre situation), merci de joindre une
          attestation fiscale justifiant de la régularité de votre situation
          fiscale.
        </p>
      </Quote>
      <FileInput
        disabled={disabled}
        uploadedDocuments={documents}
        documentsToUpload={documents_attributes}
        documentType={'Document::DecisionHomologation'}
        handleChange={onChange}
        label={'Attestation fiscale'}
      />
      <Quote>
        <p>
          Afin de vérifier que vous êtes habilité à fournir des prestations de
          services à domicile, merci de joindre un document justifiant que vous
          êtes agréé dans les conditions prévues à l’article L. 7232-1 du code
          du travail, que vous procédez à la déclaration prévue à l’article L.
          7232-1-1 du code du travail ou que vous disposez d’une autorisation en
          cours de validité pour exercer les activités relevant du I de
          l’article D. 312-6-2 du code de l’action sociale et des familles
        </p>
      </Quote>
      <FileInput
        disabled={disabled}
        uploadedDocuments={documents}
        documentsToUpload={documents_attributes}
        documentType={'Document::DecisionHomologation'}
        handleChange={onChange}
        label={'Habilitation service à domicile'}
      />
    </ScrollablePanel>
  );
};

export default CguSection;
