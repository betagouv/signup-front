import React, { useContext } from 'react';
import { FormContext } from '../../../templates/Form';
import { ScrollablePanel } from '../../Scrollable';
import Quote from '../../../atoms/inputs/Quote';
import FileInput from '../../../molecules/FileInput';

const SECTION_LABEL = 'Licence';
const SECTION_ID = encodeURIComponent(SECTION_LABEL);

export const ContratDeLicenceSection = () => {
  const {
    disabled,
    onChange,
    enrollment: { documents = [], documents_attributes = [] },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId={SECTION_ID}>
      <h2>Contrat de Licence</h2>
      <Quote>
        <p>
          La signature devra impérativement être réalisée électroniquement par
          un dispositif certifié.
        </p>
        <p>
          Dans le cas où votre organisme n’aurait pas de dispositif de signature
          électronique, l’outil Docusign (
          <a
            href={'https://www.docusign.fr'}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.docusign.fr
          </a>
          ) offre par exemple un accès de 30 jours à sa plateforme de signature.
        </p>
        <p>
          Il vous suffira de cliquer sur « Essai gratuit » en haut à droite de
          la page Web, de créer un compte et de l’activer. Une fois cela fait,
          vous devrez déposer votre document sur la page, cocher la case « Je
          suis le seul signataire » et suivre les instructions. Vous pourrez
          utiliser le champ « Signature » présent dans le menu à gauche pour
          déposer votre signature sur le document
        </p>
      </Quote>
      <FileInput
        disabled={disabled}
        uploadedDocuments={documents}
        documentsToUpload={documents_attributes}
        documentType={'Document::DecisionHomologation'}
        onChange={onChange}
        label={'Contrat de licence signé'}
      />
    </ScrollablePanel>
  );
};

ContratDeLicenceSection.sectionLabel = SECTION_LABEL;

export default ContratDeLicenceSection;
