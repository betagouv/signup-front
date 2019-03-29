import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  createOrUpdateEnrollment,
  triggerEnrollment,
  updateEnrollmentContacts,
} from '../../lib/services';
import Prompt from '../Prompt';
import { getErrorMessages } from '../../lib/utils';

const { REACT_APP_API_PARTICULIER_HOST: API_PARTICULIER_HOST } = process.env;

class ActionButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doShowPrompt: false,
      promptMessage: '',
    };
  }

  aclToDisplayInfo = {
    send_application: {
      label: 'Soumettre la demande',
      cssClass: 'primary enrollment',
    },
    validate_application: {
      label: 'Valider',
      cssClass: 'primary enrollment',
    },
    review_application: {
      label: 'Demander une modification',
      cssClass: 'secondary enrollment',
    },
    refuse_application: {
      label: 'Refuser',
      cssClass: 'warning enrollment',
    },
    update_contacts: {
      label: 'Mettre à jour les contacts',
      cssClass: 'primary enrollment',
    },
  };

  transformAclToActions = acl => {
    return (
      _(acl)
        // {'send_application': true, 'review_application': false, 'create': true}
        .pickBy((value, key) => value && this.aclToDisplayInfo[key])
        // {'send_application': true}
        .keys()
        // ['send_application']
        .map(acl => ({
          id: acl,
          label: this.aclToDisplayInfo[acl].label,
          cssClass: this.aclToDisplayInfo[acl].cssClass,
          trigger: this.handleSubmitFactory(acl),
        }))
        // [{id: 'send_application', trigger: ..., label: 'Envoyer'}]
        .value()
    );
  };

  getActionMessage = action => {
    const promptMessage = {
      review_application:
        'Précisez au demandeur les modifications à apporter à sa demande\xa0:',
      refuse_application: 'Précisez au demandeur le motif de votre refus\xa0:',
    }[action];

    this.setState({ doShowPrompt: true, promptMessage });

    return new Promise(resolve => {
      this.resolveActionMessagePromise = resolve;
    });
  };

  submitActionMessage = message => {
    this.resolveActionMessagePromise(message);

    this.setState({ doShowPrompt: false, promptMessage: '' });
  };

  cancelActionMessage = () => {
    this.resolveActionMessagePromise();

    this.setState({ doShowPrompt: false, promptMessage: '' });
  };

  triggerAction = async action => {
    const resultMessages = { errorMessages: [], successMessages: [] };

    try {
      let comment = null;

      if (['review_application', 'refuse_application'].includes(action)) {
        comment = await this.getActionMessage(action);

        if (!comment) {
          // do not trigger action if no message is provided or when clicking on cancel
          return resultMessages;
        }
      }

      if (action === 'update_contacts') {
        await updateEnrollmentContacts({
          enrollment: this.props.enrollment,
        });

        return resultMessages;
      }

      let enrollmentId = this.props.enrollment.id;

      if (this.props.enrollment.acl.update) {
        const newEnrollment = await createOrUpdateEnrollment({
          enrollment: this.props.enrollment,
        });
        this.props.updateEnrollment(newEnrollment);
        enrollmentId = newEnrollment.id;

        resultMessages.successMessages.push('Votre demande a été sauvegardée.');
      }

      await triggerEnrollment({
        action,
        id: enrollmentId,
        comment,
      });

      return resultMessages;
    } catch (error) {
      resultMessages.errorMessages.push(...getErrorMessages(error));

      return resultMessages;
    }
  };

  handleSubmitFactory = action => {
    return async event => {
      event.preventDefault();

      const resultMessages = await this.triggerAction(action);

      this.props.handleSubmit(resultMessages);
    };
  };

  handleSaveDraft = event => {
    event.preventDefault();

    createOrUpdateEnrollment({ enrollment: this.props.enrollment })
      .then(() => this.props.handleSubmit({}))
      .catch(errors =>
        this.props.handleSubmit({ errorMessages: getErrorMessages(errors) })
      );
  };

  render() {
    const { acl, token_id } = this.props.enrollment;
    const actions = this.transformAclToActions(acl);
    const { doShowPrompt, promptMessage } = this.state;

    return (
      <React.Fragment>
        <div className="button-list enrollment">
          {acl.update && (
            <button
              className="button large secondary enrollment"
              onClick={this.handleSaveDraft}
            >
              Sauvegarder le brouillon
            </button>
          )}

          {token_id && (
            <a
              className="button large secondary enrollment"
              href={`${API_PARTICULIER_HOST}/admin/token/${token_id}`}
            >
              Gérer l'accès à l'API
            </a>
          )}

          {actions.map(({ cssClass, id, label, trigger }) => (
            <button
              key={id}
              className={`button large ${cssClass}`}
              onClick={trigger}
            >
              {label}
            </button>
          ))}
        </div>

        {doShowPrompt && (
          <Prompt
            onAccept={this.submitActionMessage}
            onCancel={this.cancelActionMessage}
            promptMessage={promptMessage}
          />
        )}
      </React.Fragment>
    );
  }
}

ActionButtons.propTypes = {
  enrollment: PropTypes.object.isRequired,
  updateEnrollment: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ActionButtons;
