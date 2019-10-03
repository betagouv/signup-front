import React from 'react';
import PropTypes from 'prop-types';
import DocumentUpload from '../../form/DocumentUpload';
import { ScrollablePanel } from '../../elements/Scrollable';

const EntrantsTechniquesSection = ({
  disabled = false,
  onChange = () => null,
  onDocumentsChange = () => null,
  enrollment: {
    documents = [],
    documents_attributes = [],
    additional_content: { autorite_certification = '', ips_de_production = '' },
  },
}) => (
  <ScrollablePanel scrollableId="entrants-techniques">
    <h2>Entrants techniques</h2>
    <div className="text-quote">
      <p>
        Afin de permettre la liaison technique entre votre SI et celui de la
        DGFiP, vous devez fournir les entrants techniques suivants :
      </p>
      <ul>
        <li>
          adresses IP des serveurs qui vont communiquer avec l'API « impôt
          particulier »
        </li>
        <li>
          partie publique d’un certificat client RGS V2.0 en cours de validité
          avec son autorité de certification émettrice
        </li>
      </ul>
      <p>
        Afin de permettre votre mise en production dans les meilleures
        conditions possibles, veuillez vous assurer de la qualité de ces
        livrables techniques.
      </p>
    </div>
    <DocumentUpload
      disabled={disabled}
      uploadedDocuments={documents}
      documentsToUpload={documents_attributes}
      documentType={'Document::ProductionCertificatePublicKey'}
      handleDocumentsChange={onDocumentsChange}
      label={'Certificat de production'}
    />

    <div className="form__group">
      <label htmlFor="autorite_certification">Autorité de certification</label>
      <input
        type="text"
        onChange={onChange}
        name="additional_content.autorite_certification"
        id="autorite_certification"
        readOnly={disabled}
        value={autorite_certification}
      />
    </div>
    <div className="form__group">
      <label htmlFor="ips_de_production">IPs de production</label>
      <input
        type="text"
        onChange={onChange}
        name="additional_content.ips_de_production"
        id="ips_de_production"
        readOnly={disabled}
        value={ips_de_production}
      />
      <small className="card__meta">
        Vous pouvez ajouter plusieurs adresses IP en les séparant par une
        virgule (ex: 111.111.11.11, 111.111.11.12)
      </small>
    </div>
  </ScrollablePanel>
);

EntrantsTechniquesSection.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onDocumentsChange: PropTypes.func,
  enrollment: PropTypes.shape({
    documents: PropTypes.array,
    documents_attributes: PropTypes.array,
    additional_content: PropTypes.object,
  }),
};

export default EntrantsTechniquesSection;
