import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  groupBy,
  isEmpty,
  isObject,
  omitBy,
  merge,
  zipObject,
  zipObjectDeep,
} from 'lodash';
import Linkify from 'linkifyjs/react';

import { getUserEnrollment } from '../lib/services';
import ValidatedFranceconnectEnrollmentsSelector from './form/ValidatedFranceconnectEnrollmentsSelector';
import ActionButtons from './form/ActionButtons';
import DocumentUpload from './form/DocumentUpload';
import ActivityFeed from './form/ActivityFeed';
import Helper from './elements/Helper';
import OrganizationSelector from './form/OrganizationSelector';
import { ScrollablePanel } from './elements/Scrollable';
import { RgpdContact } from './form/RgpdContact';
import { Contact } from './form/Contact';
import Scopes from './form/Scopes';

class Form extends React.Component {
  constructor(props) {
    super(props);

    const { availableScopes, target_api, contacts } = props;

    const defaultContacts = {
      technique: {
        heading: 'Responsable technique',
        description: () => (
          <p>
            Cette personne recevra les accès techniques par mail. Le responsable
            technique peut être le contact technique de votre prestataire.
          </p>
        ),
        email: '',
      },
    };

    const initialContacts = !isEmpty(contacts) ? contacts : defaultContacts;

    this.state = {
      errorMessages: [],
      successMessages: [],
      isUserEnrollmentLoading: true,
      enrollment: {
        acl: {
          update: true,
          send_application: true, // Enable edition for new enrollment (ie. enrollment has no id)
        },
        contacts: initialContacts,
        intitule: '',
        description: '',
        fondement_juridique_title: '',
        fondement_juridique_url: '',
        documents: [],
        documents_attributes: [],
        data_retention_period: '',
        data_retention_comment: '',
        data_recipients: '',
        target_api,
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
        cgu_approved: false,
        linked_token_manager_id: null,
        additional_content: {},
        dpo_label: '',
        dpo_email: '',
        dpo_phone_number: '',
        responsable_traitement_label: '',
        responsable_traitement_email: '',
        responsable_traitement_phone_number: '',
      },
    };
  }

  componentDidMount() {
    const id = this.props.enrollmentId;

    if (!id) {
      return this.setState({ isUserEnrollmentLoading: false });
    }

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
  }

  updateEnrollment = enrollment => {
    if (!this.state.enrollment.id && enrollment.id) {
      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${
          window.location.pathname.endsWith('/') ? '' : '/'
        }${enrollment.id}`
      );
    }

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
    organization_id,
    siret,
    contacts,
    dpo_label,
    dpo_email,
    dpo_phone_number,
    responsable_traitement_label,
    responsable_traitement_email,
    responsable_traitement_phone_number,
  }) => {
    this.setState(({ enrollment: prevEnrollment }) => ({
      enrollment: merge({}, prevEnrollment, {
        linked_franceconnect_enrollment_id,
        intitule,
        description,
        organization_id,
        siret,
        contacts,
        dpo_label,
        dpo_email,
        dpo_phone_number,
        responsable_traitement_label,
        responsable_traitement_email,
        responsable_traitement_phone_number,
      }),
    }));
  };

  handleOrganizationChange = ({ organization_id, siret }) => {
    this.setState(({ enrollment: prevEnrollment }) => ({
      enrollment: merge({}, prevEnrollment, { organization_id, siret }),
    }));
  };

  handleDocumentsChange = documentsToUpload => {
    this.setState(({ enrollment: prevEnrollment }) => ({
      enrollment: merge({}, prevEnrollment, {
        documents_attributes: documentsToUpload,
      }),
    }));
  };

  handleSubmit = ({
    errorMessages = [],
    successMessages = [],
    redirectToHome = false,
  }) => {
    if (
      redirectToHome &&
      isObject(this.props.history.location.state) &&
      this.props.history.location.state.fromList
    ) {
      return this.props.history.goBack();
    }

    if (redirectToHome) {
      return this.props.history.push('/');
    }

    return this.setState({ errorMessages, successMessages });
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
        cgu_approved,
        additional_content,
        dpo_label,
        dpo_email,
        dpo_phone_number,
        responsable_traitement_label,
        responsable_traitement_email,
        responsable_traitement_phone_number,
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
      AdditionalCguContent,
      AdditionalContent,
    } = this.props;

    const disabledApplication = !acl.send_application;

    const groupTitleScopesGroup = groupBy(
      availableScopes,
      e => e.groupTitle || 'default'
    );

    return (
      <>
        {!isUserEnrollmentLoading && acl.update && (
          <div className="notification info">
            Pensez à sauvegarder régulièrement votre demande en brouillon.
          </div>
        )}

        {events.length > 0 && <ActivityFeed events={events} />}

        <ScrollablePanel scrollableId="head">
          <h2>{title}</h2>
          <DemarcheDescription />
        </ScrollablePanel>

        {!isUserEnrollmentLoading && !disabledApplication && isFranceConnected && (
          <ScrollablePanel scrollableId="franceconnect">
            <h2>Demande FranceConnect associée</h2>
            <div className="text-quote">
              <p>
                Afin de pouvoir utiliser votre bouton FranceConnect pour
                récupérer les données, merci de renseigner la demande
                FranceConnect à associer à cette demande.
              </p>
            </div>
            <br />
            <ValidatedFranceconnectEnrollmentsSelector
              onValidatedFranceconnectEnrollment={
                this.handleLinkedFranceconnectEnrollmentChange
              }
              linked_franceconnect_enrollment_id={
                linked_franceconnect_enrollment_id
              }
            />
          </ScrollablePanel>
        )}

        <ScrollablePanel scrollableId="organisation">
          <h2>Organisation à l'origine de la demande</h2>
          {!isUserEnrollmentLoading && (
            <OrganizationSelector
              disabled={isFranceConnected || disabledApplication}
              enrollment={this.state.enrollment}
              targetApi={target_api}
              handleOrganizationChange={this.handleOrganizationChange}
            />
          )}
        </ScrollablePanel>

        <ScrollablePanel scrollableId="description">
          <h2>Description de votre cas d'usage</h2>
          <div className="text-quote">
            Décrivez brièvement la raison pour laquelle vous collectez des
            données à caractère personnel, c'est-à-dire l&apos;objectif qui est
            est poursuivi par le traitement que vous mettez en place.
          </div>
          <br />
          <div className="form__group">
            <label htmlFor="intitule">Intitulé</label>
            <input
              type="text"
              onChange={this.handleChange}
              name="intitule"
              id="intitule"
              placeholder="« Se connecter au portail famille de ma ville »"
              readOnly={disabledApplication}
              value={intitule}
            />
            <small className="card__meta">
              <i>Cette information peut être rendue publique.</i>
            </small>
          </div>
          <div className="form__group">
            <label htmlFor="intitule">Description détailée</label>
            <textarea
              rows="10"
              onChange={this.handleChange}
              name="description"
              id="description"
              placeholder="« Permettre de faciliter la connexion au portail famille de ma ville sans demander de document papier aux usagés »"
              readOnly={disabledApplication}
              value={description}
            />
          </div>
        </ScrollablePanel>

        {!isEmpty(availableScopes) && (
          <ScrollablePanel scrollableId="donnees">
            <h2>Les données dont vous avez besoin</h2>
            <DonneesDescription />
            <AdditionalRgpdAgreement
              disabled={disabledApplication}
              onChange={this.handleChange}
              additional_content={additional_content}
            />
            <br />

            {Object.keys(groupTitleScopesGroup).map(group => (
              <Scopes
                key={group}
                title={
                  group === 'default'
                    ? 'Sélectionnez les données nécessaires à votre cas d’usage'
                    : group
                }
                scopes={groupTitleScopesGroup[group]}
                selectedScopes={scopes}
                disabledApplication={disabledApplication}
                handleChange={this.handleChange}
              />
            ))}
          </ScrollablePanel>
        )}

        <ScrollablePanel scrollableId="cadre-juridique">
          <h2>Le cadre juridique vous autorisant à traiter les données</h2>
          <CadreJuridiqueDescription />
          <br />
          <div className="form__group">
            <label htmlFor="fondement_juridique_title">
              Précisez la nature et, le cas échéant, les références du texte
              vous autorisant à traiter les données
            </label>
            <textarea
              rows="1"
              onChange={this.handleChange}
              name="fondement_juridique_title"
              id="fondement_juridique_title"
              readOnly={disabledApplication}
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
              onChange={this.handleChange}
              name="fondement_juridique_url"
              id="fondement_juridique_url"
              readOnly={disabledApplication}
              value={fondement_juridique_url}
            />
          </div>
          <DocumentUpload
            label="Sinon, joindre le document lui même"
            disabled={disabledApplication}
            uploadedDocuments={documents}
            documentsToUpload={documents_attributes}
            documentType={'Document::LegalBasis'}
            handleDocumentsChange={this.handleDocumentsChange}
          />
        </ScrollablePanel>

        <ScrollablePanel scrollableId="donnees-personnelles">
          <h2>Le traitement de données à caractère personnel</h2>

          <div className="form__group">
            <label htmlFor="data_recipients">
              Destinataires des données
              <Helper
                title={
                  'description du service ou des personnes physiques qui consulteront ces données'
                }
              />
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
              readOnly={disabledApplication}
              value={data_recipients}
            />
          </div>

          <div className="form__group">
            <label htmlFor="data_retention_period">
              Durée de conservation des données en mois
              <Helper
                title={'à compter de la cessation de la relation contractuelle'}
              />
            </label>
            <input
              type="number"
              min="0"
              max="2147483647"
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
                readOnly={disabledApplication}
                value={data_retention_comment}
              />
            </div>
          )}
          <div className="form__group">
            <div className="row">
              <RgpdContact
                type={'responsable_traitement'}
                label={responsable_traitement_label}
                email={responsable_traitement_email}
                phone_number={responsable_traitement_phone_number}
                disabled={disabledApplication}
                handleChange={this.handleChange}
              />
              <RgpdContact
                type={'dpo'}
                label={dpo_label}
                email={dpo_email}
                phone_number={dpo_phone_number}
                disabled={disabledApplication}
                handleChange={this.handleChange}
              />
            </div>
          </div>
        </ScrollablePanel>
        <ScrollablePanel scrollableId="contacts-moe">
          <h2>La mise en œuvre du service</h2>
          <div className="text-quote">
            <p>
              Afin de fluidifier la suite de votre demande merci de renseigner
              les contacts suivants.
            </p>
          </div>
          <br />
          <div className="row">
            {!isEmpty(contacts.technique) && (
              <Contact
                id={'technique'}
                {...contacts.technique}
                disabled={disabledApplication}
                handleChange={this.handleChange}
              />
            )}
            {!isEmpty(contacts.metier) && (
              <Contact
                id={'metier'}
                {...contacts.metier}
                disabled={disabledApplication}
                handleChange={this.handleChange}
              />
            )}
          </div>
        </ScrollablePanel>

        <ScrollablePanel scrollableId="cgu">
          <h2>Modalités d&apos;utilisation</h2>
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
              et je les valide. Je confirme que le DPD de mon organisation est
              informé de ma demande.
            </label>
          </div>

          <AdditionalCguContent
            additional_content={additional_content}
            onChange={this.handleChange}
            disabled={disabledApplication}
          />
        </ScrollablePanel>

        <AdditionalContent
          additional_content={additional_content}
          onChange={this.handleChange}
          handleDocumentsChange={this.handleDocumentsChange}
          disabled={disabledApplication}
          documents={documents}
          documents_attributes={documents_attributes}
        />

        {successMessages.map(successMessage => (
          <div key={successMessage} className="notification success">
            <Linkify>{successMessage}</Linkify>
          </div>
        ))}
        {errorMessages.map(errorMessage => (
          <div key={errorMessage} className="notification error">
            <Linkify>{errorMessage}</Linkify>
          </div>
        ))}

        <ActionButtons
          enrollment={this.state.enrollment}
          updateEnrollment={this.updateEnrollment}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

Form.propTypes = {
  enrollmentId: PropTypes.string,
  title: PropTypes.string,
  DemarcheDescription: PropTypes.func.isRequired,
  isFranceConnected: PropTypes.bool,
  contacts: PropTypes.shape({
    technique: PropTypes.shape({
      heading: PropTypes.string,
      description: PropTypes.func,
      email: PropTypes.string,
      phone_number: PropTypes.string,
    }),
    metier: PropTypes.shape({
      heading: PropTypes.string,
      description: PropTypes.func,
      email: PropTypes.string,
      phone_number: PropTypes.string,
    }),
  }),
  CadreJuridiqueDescription: PropTypes.func,
  DonneesDescription: PropTypes.func,
  availableScopes: PropTypes.array.isRequired,
  CguDescription: PropTypes.func,
  cguLink: PropTypes.string.isRequired,
  AdditionalRgpdAgreement: PropTypes.func,
  AdditionalContent: PropTypes.func,
  AdditionalCguContent: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        fromList: PropTypes.bool,
      }),
    }),
  }),
};

Form.defaultProps = {
  enrollmentId: null,
  isFranceConnected: false,
  contacts: {},
  CadreJuridiqueDescription: () => <></>,
  DonneesDescription: () => <></>,
  CguDescription: () => <></>,
  AdditionalRgpdAgreement: () => <></>,
  AdditionalContent: () => <></>,
  AdditionalCguContent: () => <></>,
};

export default withRouter(Form);
