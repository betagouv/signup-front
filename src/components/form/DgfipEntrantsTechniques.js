import React from 'react';
import PropTypes from 'prop-types';
import DocumentUpload from './DocumentUpload';
import moment from 'moment';

const DgfipEntrantsTechniques = ({
  disabled,
  onChange,
  handleDocumentsChange,
  documents,
  documents_attributes,
  additional_content: {
    autorite_certification = '',
    ips_de_production = '',
    autorite_homologation_nom = '',
    autorite_homologation_fonction = '',
    date_homologation = '',
    date_fin_homologation = '',
    nombre_demandes_annuelle = '',
    pic_demandes_par_seconde = '',
    nombre_demandes_mensuelles,
    recette_fonctionnelle = '',
  },
}) => {
  // initialize additional_content
  if (!nombre_demandes_mensuelles) {
    onChange({
      target: {
        type: null,
        checked: null,
        value: Array(12).fill(''),
        name: 'additional_content.nombre_demandes_mensuelles',
      },
    });

    return null;
  }

  return (
    <>
      <div className="panel">
        <h2 id="homologation-securite">Homologation de sécurité</h2>
        <div className="information-text">
          <p>
            Le Référentiel Général de Sécurité (RGS 2.0) rend la démarche
            d’homologation obligatoire pour les SI relatifs aux échanges entre
            une autorité administrative et les usagers ou entre autorités
            administratives.
          </p>
          <p>
            Si vous l'avez déjà fait, complétez les informations relatives à
            l'homologation et déposez la décision formelle d’homologation
            (également appelée attestation formelle).
          </p>
        </div>
        <div className="form__group">
          <label htmlFor="autorite_homologation_nom">
            Nom de l&apos;autorité d&apos;homologation
          </label>
          <input
            type="text"
            onChange={onChange}
            name="additional_content.autorite_homologation_nom"
            id="autorite_homologation_nom"
            disabled={disabled}
            value={autorite_homologation_nom}
          />
        </div>
        <div className="form__group">
          <label htmlFor="autorite_homologation_fonction">
            Fonction de l&apos;autorité d&apos;homologation
          </label>
          <input
            type="text"
            onChange={onChange}
            name="additional_content.autorite_homologation_fonction"
            id="autorite_homologation_fonction"
            disabled={disabled}
            value={autorite_homologation_fonction}
          />
        </div>
        <div className="form__group">
          <label htmlFor="date_homologation">
            Date de début l&apos;homologation
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
            Date de fin de l&apos;homologation
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
          handleDocumentsChange={handleDocumentsChange}
          label={"Décision d'homologation"}
        />
      </div>

      <div className="panel">
        <h2 id="entrants-techniques">Entrants techniques</h2>
        <div className="information-text">
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
              partie publique d’un certificat client RGS V2.0 en cours de
              validité avec son autorité de certification émettrice
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
          handleDocumentsChange={handleDocumentsChange}
          label={'Certificat de production'}
        />

        <div className="form__group">
          <label htmlFor="autorite_certification">
            Autorité de certification
          </label>
          <input
            type="text"
            onChange={onChange}
            name="additional_content.autorite_certification"
            id="autorite_certification"
            disabled={disabled}
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
            disabled={disabled}
            value={ips_de_production}
          />
          <small className="card__meta">
            Vous pouvez ajouter plusieurs adresses IP en les séparant par une
            virgule (ex: 111.111.11.11, 111.111.11.12)
          </small>
        </div>
      </div>
      <div className="panel">
        <h2 id="volumetrie">Volumétrie</h2>
        <div className="information-text">
          <p>
            Connaître les données relatives à la volumétrie et à la saisonnalité
            de votre téléservice nous permet de vous offrir la meilleure qualité
            de service possible. Ces informations sont transmises aux
            fournisseurs de vos données pour prévenir les pics de charges .
          </p>
          <p>
            Conformément à la convention d'adhésion, nous nous réservons le
            droit de réduire ou couper les appels autorisés au fournisseur de
            service.
          </p>
        </div>
        <div className="form__group">
          <label htmlFor="nombre_demandes_annuelle">
            Quel est le volume global annuel des demandes de votre téléservice
            (en nombre de demandes par an)&nbsp;?
          </label>
          <input
            type="number"
            min="0"
            onChange={onChange}
            name="additional_content.nombre_demandes_annuelle"
            id="nombre_demandes_annuelle"
            disabled={disabled}
            value={nombre_demandes_annuelle}
          />
        </div>
        <div className="form__group">
          <label htmlFor="pic_demandes_par_seconde">
            Quel est le pic de charge (en nombre de demandes par heure)&nbsp;?
          </label>
          <input
            type="number"
            min="0"
            onChange={onChange}
            name="additional_content.pic_demandes_par_seconde"
            id="pic_demandes_par_seconde"
            disabled={disabled}
            value={pic_demandes_par_seconde}
          />
        </div>
        <div className="form__group">
          <label>
            Quel est la répartition de la charge (en nombre de demandes par
            mois, 0 si le service est fermé)&nbsp;?
          </label>
          <div className="form__group">
            <div className="date_input_row">
              {nombre_demandes_mensuelles.map((nombresDeDemandes, index) => (
                <div
                  key={`nombre_demandes_mensuelles.${index}`}
                  className="date_input_col"
                >
                  <label htmlFor={`nombre_demandes_mensuelles.${index}`}>
                    {moment(index + 1, 'M').format('MMMM')}
                  </label>
                  <input
                    type="number"
                    min="0"
                    onChange={onChange}
                    name={`additional_content.nombre_demandes_mensuelles.${index}`}
                    id={`nombre_demandes_mensuelles.${index}`}
                    disabled={disabled}
                    value={nombresDeDemandes}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h2 id="recette-fonctionnelle">Recette fonctionnelle</h2>
        <div className="information-text">
          <p>
            Une API de test est mise à votre disposition pour vous permettre de
            qualifier votre applicatif. Elle vous permet de visualiser les
            données retournées par l'API « impôt particulier ».
          </p>
          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/france-connect/service-provider-example"
            >
              Accèder à l'API de test
            </a>
          </p>
          <p>
            Cette qualification est obligatoire tant pour votre homologation de
            sécurité ou vos obligations RGPD que pour demander l'entrée en
            production auprès de la DGFiP.
          </p>
        </div>
        <div className="form__group">
          <input
            onChange={onChange}
            checked={recette_fonctionnelle}
            type="checkbox"
            name="additional_content.recette_fonctionnelle"
            id="checkbox-recette_fonctionnelle"
            disabled={disabled}
          />
          <label
            htmlFor="checkbox-recette_fonctionnelle"
            className="label-inline"
          >
            J&apos;atteste avoir réalisé une recette fonctionnelle
          </label>
        </div>
        {!disabled && (
          <div className="notification form__group">
            <p>
              La demande d’entrée en production revêt un caractère définitif et
              entraîne le transfert de vos entrants techniques vers les
              exploitants informatiques de la DGFiP. Merci de vous assurer de la
              bonne valorisation de l'ensemble des informations demandées avant
              de procéder à cette demande. Votre entrée en production se fera
              lors du premier créneau disponible à compter de l'envoi des
              entrants techniques de production.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

DgfipEntrantsTechniques.propTypes = {
  additional_content: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  handleDocumentsChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  documents: PropTypes.array.isRequired,
  documents_attributes: PropTypes.array.isRequired,
};

export default DgfipEntrantsTechniques;
