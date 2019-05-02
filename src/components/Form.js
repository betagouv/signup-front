import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { isEmpty, omitBy, merge, zipObject, zipObjectDeep } from 'lodash';

import { getUserEnrollment } from '../lib/services';
import ValidatedFranceconnectEnrollmentsSelector from './form/ValidatedFranceconnectEnrollmentsSelector';
import Siret from './form/Siret';
import ActionButtons from './form/ActionButtons';
import DocumentUpload from './form/DocumentUpload';
import ActivityFeed from './form/ActivityFeed';
import Helper from './elements/Helper';

class Form extends React.Component {
  constructor(props) {
    super(props);

    const availableScopes = props.availableScopes;

    this.state = {
      errorMessages: [],
      successMessages: [],
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
            hint:
              "Seule une personne appartenant à l'organisme demandeur peut être renseigné",
            link: 'https://www.cnil.fr/fr/designation-dpo',
            nom: '',
            email: '',
            phone_number: '',
          },
          {
            id: 'responsable_traitement',
            heading: 'Responsable de traitement',
            hint:
              "Seule une personne appartenant à l'organisme demandeur peut être renseigné",
            link: 'https://www.cnil.fr/fr/definition/responsable-de-traitement',
            nom: '',
            email: '',
            phone_number: '',
          },
          {
            id: 'technique',
            heading: 'Responsable technique',
            hint:
              'Cette personne recevra les accès techniques. Le responsable technique peut être le contact technique de votre prestataire.',
            nom: '',
            email: '',
            phone_number: '',
          },
        ],
        intitule: '',
        description: '',
        fondement_juridique_title: '',
        fondement_juridique_url: '',
        documents: [],
        documents_attributes: [],
        data_retention_period: '',
        data_retention_comment: '',
        data_recipients: '',
        target_api: props.target_api,
        linked_franceconnect_enrollment_id: null,
        events: [],
        id: null,
        scopes: zipObject(
          availableScopes.map(({ name }) => name),
          availableScopes.map(
            ({ mandatory, checkedByDefault }) =>
              !!mandatory || !!checkedByDefault
          )
        ),
        siret: '',
        cgu_approved: false,
        linked_token_manager_id: null,
        additional_content: {},
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

  handleLinkedFranceconnectEnrollmentChange = ({
    linked_franceconnect_enrollment_id,
    intitule,
    description,
    siret,
    contacts,
  }) => {
    this.setState(({ enrollment: prevEnrollment }) => ({
      enrollment: merge({}, prevEnrollment, {
        contacts,
        intitule,
        description,
        linked_franceconnect_enrollment_id,
        siret,
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

  handleSubmit = ({ errorMessages = [], successMessages = [] }) => {
    if (!isEmpty(errorMessages)) {
      return this.setState({ errorMessages, successMessages });
    }

    return this.props.history.push('/');
  };

  render() {
    const {
      enrollment: {
        acl,
        contacts,
        intitule,
        description,
        fondement_juridique_title,
        fondement_juridique_url,
        documents,
        documents_attributes,
        data_recipients,
        data_retention_period,
        data_retention_comment,
        target_api,
        linked_franceconnect_enrollment_id,
        events,
        scopes,
        siret,
        cgu_approved,
        additional_content,
      },
      errorMessages,
      successMessages,
      isUserEnrollmentLoading,
    } = this.state;

    const {
      title,
      DemarcheDescription,
      isFranceConnected,
      CguDescription,
      cguLink,
      CadreJuridiqueDescription,
      DonneesDescription,
      availableScopes,
      AdditionalRgpdAgreement,
      AdditionalDataContent,
      AdditionalCguContent,
      AdditionalContent,
    } = this.props;

    const disabledApplication = !acl.send_application;
    const disableContactInputs = !(acl.update_contacts || acl.send_application);

    return (
      <>
        {!isUserEnrollmentLoading &&
          acl.update && (
            <div className="notification info">
              Pensez à sauvegarder régulièrement votre demande en brouillon.
            </div>
          )}

        {events.length > 0 && <ActivityFeed events={events} />}

        <div className="panel">
          <h2 id="demarche">{title}</h2>
          <DemarcheDescription />
          <br />
          {!isUserEnrollmentLoading &&
            !disabledApplication &&
            isFranceConnected && (
              <ValidatedFranceconnectEnrollmentsSelector
                onValidatedFranceconnectEnrollment={
                  this.handleLinkedFranceconnectEnrollmentChange
                }
                linked_franceconnect_enrollment_id={
                  linked_franceconnect_enrollment_id
                }
              />
            )}
          <div className="form__group">
            <label htmlFor="intitule">Intitulé</label>
            <input
              type="text"
              onChange={this.handleChange}
              name="intitule"
              id="intitule"
              disabled={isFranceConnected || disabledApplication}
              value={intitule}
            />
            <small className="card__meta">
              <i>Cette information peut être rendue publique.</i>
            </small>
          </div>
          <div className="form__group">
            <label htmlFor="description">
              Décrivez brièvement la raison pour laquelle vous collectez des
              données à caractère personnel relatives, c'est à dire
              l&apos;objectif qui est poursuivi par le traitement que vous
              mettez en place.
            </label>
            <textarea
              rows="10"
              onChange={this.handleChange}
              name="description"
              id="description"
              disabled={isFranceConnected || disabledApplication}
              value={description}
              placeholder="« se connecter au portail famille de ma ville », « accèder à son compte personnel de mutuelle », etc."
            />
          </div>
        </div>

        <div className="panel">
          <h2 id="identite">Identité</h2>
          {!isUserEnrollmentLoading && (
            <Siret
              disabled={isFranceConnected || disabledApplication}
              siret={siret}
              targetApi={target_api}
              handleSiretChange={this.handleSiretChange}
            />
          )}
        </div>

        <div className="panel">
          <h2 id="contacts">Contacts</h2>
          <div className="row">
            {contacts.map(
              (
                { id, heading, link, hint, nom, email, phone_number },
                index
              ) => (
                <div key={id} className="card">
                  <div className="card__content">
                    <h3>
                      {heading}
                      {hint && <Helper title={hint} />}
                    </h3>
                    {link && (
                      <a
                        className="card__meta"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {' '}
                        (plus d&acute;infos)
                      </a>
                    )}
                    <div className="form__group">
                      <label htmlFor={`person_${id}_nom`}>Nom et Prénom</label>
                      <input
                        type="text"
                        onChange={this.handleChange}
                        name={`contacts[${index}].nom`}
                        id={`person_${id}_nom`}
                        disabled={isFranceConnected || disableContactInputs}
                        value={nom}
                      />
                      {id === 'responsable_traitement' && (
                        <small className="card__meta">
                          <i>Cette information peut être rendue publique.</i>
                        </small>
                      )}
                    </div>
                    <div className="form__group">
                      <label htmlFor={`person_${id}_email`}>Email</label>
                      <input
                        type="email"
                        onChange={this.handleChange}
                        name={`contacts[${index}].email`}
                        id={`person_${id}_email`}
                        disabled={isFranceConnected || disableContactInputs}
                        value={email}
                      />
                    </div>
                    <div className="form__group">
                      <label htmlFor={`person_${id}_phone_number`}>
                        Numéro de téléphone
                        <Helper
                          title={
                            'Ce numéro peut être le numéro du secrétariat ou le numéro direct de ' +
                            'la personne concernée. Ce numéro nous permettra de vous contacter ' +
                            "lors d'incidents ou difficultés."
                          }
                        />
                      </label>
                      <input
                        type="tel"
                        onChange={this.handleChange}
                        name={`contacts[${index}].phone_number`}
                        id={`person_${id}_phone_number`}
                        disabled={isFranceConnected || disableContactInputs}
                        value={phone_number}
                        pattern="[0-9]{10}"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="panel">
          <h2 id="cadre-juridique">Cadre juridique</h2>
          <CadreJuridiqueDescription />
          <br />
          <div className="form__group">
            <label htmlFor="fondement_juridique_title">
              Référence du texte vous autorisant à récolter ces données
            </label>
            <input
              type="text"
              onChange={this.handleChange}
              name="fondement_juridique_title"
              id="fondement_juridique_title"
              disabled={disabledApplication}
              value={fondement_juridique_title}
            />
          </div>
          <h3>Document associé</h3>
          <div className="form__group">
            <label htmlFor="fondement_juridique_url">
              URL du texte{' '}
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
              onChange={this.handleChange}
              name="fondement_juridique_url"
              id="fondement_juridique_url"
              disabled={disabledApplication}
              value={fondement_juridique_url}
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
        </div>

        {!isEmpty(availableScopes) && (
          <div className="panel">
            <h2 id="donnees">Données</h2>
            <DonneesDescription />
            <AdditionalRgpdAgreement
              disabled={disabledApplication}
              onChange={this.handleChange}
              additional_content={additional_content}
            />
            <div className="form__group">
              <fieldset className="vertical">
                <label>Sélectionnez vos jeux de données souhaités</label>
                <div className="row">
                  <div className="column" style={{ flex: 1 }}>
                    {availableScopes.map(({ name, humanName, mandatory }) => (
                      <div key={name}>
                        <input
                          type="checkbox"
                          className="scope__checkbox"
                          onChange={this.handleChange}
                          name={`scopes.${name}`}
                          id={`checkbox-scope-${name}`}
                          disabled={disabledApplication || mandatory}
                          checked={scopes[name]}
                        />
                        <label
                          htmlFor={`checkbox-scope-${name}`}
                          className="label-inline"
                        >
                          {humanName}
                          {mandatory && <i> (nécessaire)</i>}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </fieldset>
            </div>

            <AdditionalDataContent
              disabled={disabledApplication}
              onChange={this.handleChange}
              additional_content={additional_content}
            />

            <div className="form__group">
              <label htmlFor="data_recipients">
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
                placeholder="« agents instructeurs des demandes d’aides », « usagers des services publics de la ville », etc."
                onChange={this.handleChange}
                name="data_recipients"
                id="data_recipients"
                disabled={disabledApplication}
                value={data_recipients}
              />
            </div>

            <div className="form__group">
              <label htmlFor="data_retention_period">
                Conservation des données
                <Helper
                  title={
                    'en mois, à compter de la cessation de la relation contractuelle'
                  }
                />
              </label>
              <input
                type="number"
                min="0"
                onChange={this.handleChange}
                name="data_retention_period"
                id="data_retention_period"
                disabled={disabledApplication}
                value={data_retention_period}
              />
            </div>
            {data_retention_period > 36 && (
              <div className="form__group">
                <label
                  htmlFor="data_retention_comment"
                  className="notification warning"
                >
                  Cette durée excède la durée communément constatée (36 mois).
                  Veuillez justifier cette durée dans le champ ci-après:
                </label>
                <textarea
                  rows="10"
                  onChange={this.handleChange}
                  name="data_retention_comment"
                  id="data_retention_comment"
                  disabled={disabledApplication}
                  value={data_retention_comment}
                />
              </div>
            )}
          </div>
        )}

        <div className="panel">
          <h2 id="cgu">Modalités d&apos;utilisation</h2>
          <CguDescription />
          <div className="form__group">
            <input
              onChange={this.handleChange}
              disabled={disabledApplication ? 'disabled' : false}
              checked={cgu_approved}
              type="checkbox"
              name="cgu_approved"
              id="cgu_approved"
            />
            <label htmlFor="cgu_approved" className="label-inline">
              J'ai pris connaissance des{' '}
              <a href={cguLink} target="_blank" rel="noreferrer noopener">
                modalités d&apos;utilisation
              </a>{' '}
              et je les valide. Je confirme que le DPD de mon organisme est
              informé de ma demande.
            </label>
          </div>

          <AdditionalCguContent
            additional_content={additional_content}
            onChange={this.handleChange}
            disabled={disabledApplication}
          />
        </div>

        <AdditionalContent
          additional_content={additional_content}
          onChange={this.handleChange}
          handleDocumentsChange={this.handleDocumentsChange}
          disabled={disabledApplication}
          documents={documents}
          documents_attributes={documents_attributes}
        />

        <ActionButtons
          enrollment={this.state.enrollment}
          updateEnrollment={this.updateEnrollment}
          handleSubmit={this.handleSubmit}
        />

        {successMessages.map(successMessage => (
          <div key={successMessage} className="notification success">
            {successMessage}
          </div>
        ))}
        {errorMessages.map(errorMessage => (
          <div key={errorMessage} className="notification error">
            {errorMessage}
          </div>
        ))}
      </>
    );
  }
}

Form.propTypes = {
  enrollmentId: PropTypes.string,
  title: PropTypes.string,
  DemarcheDescription: PropTypes.func.isRequired,
  isFranceConnected: PropTypes.bool,
  CadreJuridiqueDescription: PropTypes.func,
  DonneesDescription: PropTypes.func,
  availableScopes: PropTypes.array.isRequired,
  CguDescription: PropTypes.func,
  cguLink: PropTypes.string.isRequired,
  AdditionalRgpdAgreement: PropTypes.func,
  AdditionalDataContent: PropTypes.func,
  AdditionalContent: PropTypes.func,
  AdditionalCguContent: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

Form.defaultProps = {
  enrollmentId: null,
  isFranceConnected: false,
  CadreJuridiqueDescription: () => <></>,
  DonneesDescription: () => <></>,
  CguDescription: () => <></>,
  AdditionalRgpdAgreement: () => <></>,
  AdditionalDataContent: () => <></>,
  AdditionalContent: () => <></>,
  AdditionalCguContent: () => <></>,
};

export default withRouter(Form);
