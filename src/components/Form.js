import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { isEmpty, omitBy, merge, zipObject, zipObjectDeep } from 'lodash';
import moment from 'moment';

import { getUserEnrollment } from '../lib/services';
import { getErrorMessage } from '../lib/utils';
import FranceConnectServiceProvider from './form/FranceConnectServiceProvider';
import Siret from './form/Siret';
import ActionButtons from './form/ActionButtons';
import DgfipEntrantsTechniques from './form/DgfipEntrantsTechniques';
import DocumentUpload from './form/DocumentUpload';

class Form extends React.Component {
  constructor(props) {
    super(props);

    const { form } = props;

    this.state = {
      errors: [],
      isUserEnrollmentLoading: true,
      enrollment: {
        acl: {
          update: true,
          send_application: true, // Enable edition for new enrollment (ie. enrollment has no id)
        },
        contacts: [
          {
            id: 'dpo',
            heading: 'Délégué à la protection des données',
            link: 'https://www.cnil.fr/fr/designation-dpo',
            nom: '',
            email: '',
            telephone_portable: '',
          },
          {
            id: 'responsable_traitement',
            heading: 'Responsable de traitement',
            link: 'https://www.cnil.fr/fr/definition/responsable-de-traitement',
            nom: '',
            email: '',
            telephone_portable: '',
          },
          {
            id: 'technique',
            heading: 'Responsable technique',
            nom: '',
            email: '',
            telephone_portable: '',
          },
        ],
        demarche: {
          intitule: '',
          description: '',
          fondement_juridique: '',
          url_fondement_juridique: '',
        },
        documents: [],
        documents_attributes: [],
        donnees: {
          conservation: '',
          destinataires: zipObject(
            form.scopes.map(({ name }) => name),
            new Array(form.scopes.length).fill('')
          ),
        },
        fournisseur_de_donnees: form.provider,
        fournisseur_de_service: '',
        messages: [],
        id: null,
        scopes: zipObject(
          form.scopes.map(({ name }) => name),
          new Array(form.scopes.length).fill(false)
        ),
        siret: '',
        validation_de_convention: false,
      },
    };
  }

  componentDidMount() {
    const id = this.props.enrollmentId;

    if (id) {
      getUserEnrollment(id)
        .then(enrollment => {
          this.setState(({ enrollment: prevEnrollment }) => ({
            isUserEnrollmentLoading: false,
            enrollment: merge(
              {},
              prevEnrollment,
              omitBy(enrollment, e => e === null) // do not merge null properties, keep empty string instead to avoid controlled input to switch to uncontrolled input
            ),
          }));
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            this.props.history.push('/');
          }
        });
    } else {
      this.setState({ isUserEnrollmentLoading: false });
    }
  }

  updateEnrollment = enrollment => {
    this.setState(({ enrollment: prevEnrollment }) => ({
      enrollment: merge(
        {},
        prevEnrollment,
        omitBy(enrollment, e => e === null) // do not merge null properties, keep empty string instead to avoid controlled input to switch to uncontrolled input
      ),
    }));
  };

  handleChange = ({ target: { type, checked, value: inputValue, name } }) => {
    const value = type === 'checkbox' ? checked : inputValue;

    this.setState(({ enrollment: prevEnrollment }) => ({
      enrollment: merge(
        {},
        prevEnrollment,
        zipObjectDeep([`${name}`], [value])
      ),
    }));
  };

  handleServiceProviderChange = ({
    intitule,
    description,
    fournisseur_de_service,
  }) => {
    this.setState(({ enrollment: prevEnrollment }) => ({
      enrollment: merge({}, prevEnrollment, {
        demarche: {
          intitule,
          description,
        },
        fournisseur_de_service,
      }),
    }));
  };

  handleSiretChange = ({ siret }) => {
    this.setState(({ enrollment: prevEnrollment }) => ({
      enrollment: merge({}, prevEnrollment, { siret }),
    }));
  };

  handleDocumentsChange = documentsToUpload => {
    this.setState(({ enrollment: prevEnrollment }) => ({
      enrollment: merge({}, prevEnrollment, {
        documents_attributes: documentsToUpload,
      }),
    }));
  };

  handleSubmit = ({ errors }) => {
    if (!isEmpty(errors)) {
      return this.setState({ errors: getErrorMessage(errors) });
    }

    return this.props.history.push('/');
  };

  render() {
    const {
      enrollment: {
        acl,
        contacts,
        demarche,
        documents,
        documents_attributes,
        donnees,
        fournisseur_de_service,
        messages,
        scopes,
        siret,
        validation_de_convention,
      },
      errors,
      isUserEnrollmentLoading,
    } = this.state;

    const {
      form,
      isDgfip,
      IntroDescription,
      DemarcheDescription,
      CguDescription,
      CadreJuridiqueDescription,
      DonneesDescription,
    } = this.props;

    const disabledApplication = !acl.send_application;
    const disableContactInputs = !(acl.update_contacts || acl.send_application);

    return (
      <div className="form">
        {messages.map(({ id, content, category, updated_at }) => {
          if (category === 'refuse_application') {
            return (
              <div key={id} className="notification error">
                <strong>
                  {moment(updated_at).calendar()} - demande refusée :
                </strong>{' '}
                {content}
              </div>
            );
          }
          if (category === 'review_application') {
            return (
              <div key={id} className="notification warning">
                <strong>
                  {moment(updated_at).calendar()} - modifications nécessaires :
                </strong>{' '}
                {content}
              </div>
            );
          }
          return null;
        })}

        <h1>{form.text.title}</h1>
        <IntroDescription />

        <h2 id="demarche">Démarche</h2>
        <DemarcheDescription />
        {!isUserEnrollmentLoading &&
          !disabledApplication &&
          form.franceConnected && (
            <FranceConnectServiceProvider
              onServiceProviderChange={this.handleServiceProviderChange}
              fournisseur_de_service={fournisseur_de_service}
            />
          )}
        <div className="form__group">
          <label htmlFor="intitule_demarche">Intitulé</label>
          <input
            type="text"
            onChange={this.handleChange}
            name="demarche.intitule"
            id="intitule_demarche"
            disabled={form.franceConnected || disabledApplication}
            value={demarche.intitule}
          />
        </div>
        <div className="form__group">
          <label htmlFor="description_service">
            Décrivez brièvement votre service ainsi que l&lsquo;utilisation
            prévue des données transmises
          </label>
          <textarea
            rows="10"
            onChange={this.handleChange}
            name="demarche.description"
            id="description_service"
            disabled={form.franceConnected || disabledApplication}
            value={demarche.description}
          />
        </div>
        {form.franceConnected && (
          <div className="form__group">
            <label>Clé fournisseur de service</label>
            <input type="text" disabled value={fournisseur_de_service} />
          </div>
        )}

        <h2 id="identite">Identité</h2>
        {!isUserEnrollmentLoading && (
          <Siret
            disabled={disabledApplication}
            siret={siret}
            handleSiretChange={this.handleSiretChange}
          />
        )}

        <h2 id="contacts">Contacts</h2>
        <div className="card-row">
          {contacts.map(
            ({ id, heading, link, nom, email, telephone_portable }, index) => (
              <div key={id} className="card">
                <div className="card__content">
                  <h3>{heading}</h3>
                  {link && (
                    <a className="card__meta" href={link}>
                      {link}
                    </a>
                  )}
                  <div className="form__group">
                    <label htmlFor={`person_${id}_nom`}>Nom et Prénom</label>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      name={`contacts[${index}].nom`}
                      id={`person_${id}_nom`}
                      disabled={disableContactInputs}
                      value={nom}
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor={`person_${id}_email`}>Email</label>
                    <input
                      type="email"
                      onChange={this.handleChange}
                      name={`contacts[${index}].email`}
                      id={`person_${id}_email`}
                      disabled={disableContactInputs}
                      value={email}
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor={`person_${id}_telephone_portable`}>
                      Numéro de téléphone portable
                    </label>
                    <small className="card__meta">
                      La clé d&apos;API vous sera envoyée par SMS à ce numéro
                    </small>
                    <input
                      type="tel"
                      onChange={this.handleChange}
                      name={`contacts[${index}].telephone_portable`}
                      id={`person_${id}_telephone_portable`}
                      disabled={disableContactInputs}
                      value={telephone_portable}
                      placeholder="06XXXXXXXX"
                      pattern="[0-9]{10}"
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <h2 id="cadre-juridique">Cadre juridique</h2>
        <CadreJuridiqueDescription />
        <div className="form__group">
          <label htmlFor="fondement_juridique">
            Référence du texte vous autorisant à récolter ces données
          </label>
          <input
            type="text"
            onChange={this.handleChange}
            name="demarche.fondement_juridique"
            id="fondement_juridique"
            disabled={disabledApplication}
            value={demarche.fondement_juridique}
          />
        </div>
        <h3>Document associé</h3>
        <div className="form__group">
          {demarche.url_fondement_juridique ? (
            <label htmlFor="url_fondement_juridique">
              <a href={demarche.url_fondement_juridique}>URL du texte</a>
            </label>
          ) : (
            <label htmlFor="url_fondement_juridique">URL du texte</label>
          )}
          <input
            type="url"
            onChange={this.handleChange}
            name="demarche.url_fondement_juridique"
            id="url_fondement_juridique"
            disabled={disabledApplication}
            value={demarche.url_fondement_juridique}
          />
        </div>
        <h3>ou</h3>
        <DocumentUpload
          disabled={disabledApplication}
          uploadedDocuments={documents}
          documentsToUpload={documents_attributes}
          documentType={'Document::LegalBasis'}
          handleDocumentsChange={this.handleDocumentsChange}
          label={'Pièce jointe'}
        />

        <h2 id="donnees">Données</h2>
        <DonneesDescription />
        <div className="form__group">
          <fieldset className="vertical">
            <label>Sélectionnez vos jeux de données souhaités</label>
            <div className="row">
              <div className="column" style={{ flex: 1 }}>
                {form.scopes.map(({ name, humanName }) => (
                  <div key={name}>
                    <input
                      type="checkbox"
                      className="scope__checkbox"
                      onChange={this.handleChange}
                      name={`scopes.${name}`}
                      id={`checkbox-scope_api_entreprise${name}`}
                      disabled={disabledApplication}
                      checked={scopes[name]}
                    />
                    <label
                      htmlFor={`checkbox-scope_api_entreprise${name}`}
                      className="label-inline"
                    >
                      {humanName}
                    </label>
                    {scopes[name] && (
                      <div className="scope__destinataire">
                        <div className="form__group">
                          <label htmlFor={`destinataire_${name}`}>
                            Destinataires{' '}
                            <a
                              href="https://www.cnil.fr/fr/definition/destinataire"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              (plus d&acute;infos)
                            </a>
                          </label>
                          <input
                            type="text"
                            onChange={this.handleChange}
                            name={`donnees.destinataires.${name}`}
                            id={`destinataire_${name}`}
                            disabled={disabledApplication}
                            value={donnees.destinataires[name]}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </fieldset>
        </div>
        <div className="form__group">
          <label htmlFor="donnees_conservation">
            Conservation des données <i>(en mois)</i>
          </label>
          <input
            type="number"
            min="0"
            onChange={this.handleChange}
            name="donnees.conservation"
            id="donnees_conservation"
            disabled={disabledApplication}
            value={donnees.conservation}
          />
        </div>

        <h2 id="cgu">Modalités d&apos;utilisation</h2>
        <CguDescription />
        <embed
          title="CGU"
          type="application/pdf"
          src={form.cguLink}
          width="100%"
          height="800px"
        />
        <div className="form__group">
          <input
            onChange={this.handleChange}
            disabled={disabledApplication ? 'disabled' : false}
            checked={validation_de_convention}
            type="checkbox"
            name="validation_de_convention"
            id="validation_de_convention"
          />
          <label htmlFor="validation_de_convention" className="label-inline">
            Je valide les présentes modalités d&apos;utilisation et confirme que
            le DPO de mon organisme est informé de ma demande
          </label>
        </div>

        {isDgfip && (
          <DgfipEntrantsTechniques
            enrollment={this.state.enrollment}
            onChange={this.handleChange}
            handleDocumentsChange={this.handleDocumentsChange}
            disabled={disabledApplication}
          />
        )}

        <ActionButtons
          enrollment={this.state.enrollment}
          updateEnrollment={this.updateEnrollment}
          handleSubmit={this.handleSubmit}
        />

        {errors.map(error => (
          <div key={error} className="notification error">
            {error}
          </div>
        ))}
      </div>
    );
  }
}

Form.propTypes = {
  enrollmentId: PropTypes.string,
  form: PropTypes.object.isRequired,
  isDgfip: PropTypes.bool,
  IntroDescription: PropTypes.func.isRequired,
  DemarcheDescription: PropTypes.func.isRequired,
  CguDescription: PropTypes.func.isRequired,
  CadreJuridiqueDescription: PropTypes.func.isRequired,
  DonneesDescription: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

Form.defaultProps = {
  enrollmentId: null,
  isDgfip: false,
};

export default withRouter(Form);
