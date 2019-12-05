import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  createOrUpdateEnrollment,
  deleteEnrollment,
  triggerEnrollment,
} from '../../lib/services';
import Prompt from '../elements/Prompt';
import { getErrorMessages, getTokenUrl } from '../../lib/utils';
import Spinner from '../icons/spinner';
import DoneIcon from '../icons/done';

class ActionButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      doShowPrompt: false,
      commentType: '',
    };
  }

  aclToDisplayInfo = {
    notify: {
      label: 'Envoyer un message',
      cssClass: 'secondary enrollment',
    },
    delete: {
      label: 'Supprimer la demande',
      cssClass: 'warning enrollment',
    },
    update: {
      label: 'Sauvegarder le brouillon',
      cssClass: 'secondary enrollment',
    },
    send_application: {
      label: 'Soumettre la demande',
      icon: <DoneIcon color="white" />,
      cssClass: 'primary enrollment',
    },
    refuse_application: {
      label: 'Refuser',
      cssClass: 'warning enrollment',
    },
    review_application: {
      label: 'Demander une modification',
      cssClass: 'secondary enrollment',
    },
    validate_application: {
      label: 'Valider',
      cssClass: 'primary enrollment',
    },
  };

  transformAclToActions = acl =>
    // acl = {'send_application': true, 'review_application': false, 'create': true}
    _(this.aclToDisplayInfo)
      .pickBy((value, key) => acl[key])
      // {'send_application': {label: ..., cssClass: ...}}
      .keys()
      // ['send_application']
      .map(acl => ({
        id: acl,
        label: this.aclToDisplayInfo[acl].label,
        icon: this.aclToDisplayInfo[acl].icon,
        cssClass: this.aclToDisplayInfo[acl].cssClass,
        trigger: this.handleSubmitFactory(acl),
      }))
      // [{id: 'send_application', trigger: ..., label: 'Envoyer'}]
      .value();

  getActionMessage = action => {
    this.setState({ doShowPrompt: true, commentType: action });

    return new Promise((resolve, reject) => {
      this.resolveActionMessagePromise = resolve;
      this.rejectActionMessagePromise = reject;
    });
  };

  submitActionMessage = message => {
    this.resolveActionMessagePromise(message);

    this.setState({ doShowPrompt: false, commentType: '' });
  };

  cancelActionMessage = () => {
    this.rejectActionMessagePromise();

    this.setState({ doShowPrompt: false, commentType: '' });
  };

  triggerAction = async action => {
    const resultMessages = {
      errorMessages: [],
      successMessages: [],
      redirectToHome: false,
    };

    try {
      let comment = null;

      if (
        [
          'notify',
          'review_application',
          'refuse_application',
          'validate_application',
        ].includes(action)
      ) {
        try {
          comment = await this.getActionMessage(action);
        } catch (e) {
          return resultMessages;
        }
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

      if (action === 'update') {
        return resultMessages;
      }

      if (action === 'delete') {
        await deleteEnrollment({ id: enrollmentId });
      }

      if (
        [
          'notify',
          'review_application',
          'refuse_application',
          'validate_application',
          'send_application',
        ].includes(action)
      ) {
        await triggerEnrollment({
          action,
          id: enrollmentId,
          comment,
        });
      }

      resultMessages.redirectToHome = true;

      return resultMessages;
    } catch (error) {
      resultMessages.errorMessages.push(...getErrorMessages(error));

      return resultMessages;
    }
  };

  handleSubmitFactory = action => {
    return async event => {
      event.preventDefault();
      this.setState({ isLoading: true });

      const resultMessages = await this.triggerAction(action);

      this.props.handleSubmit(resultMessages);

      this.setState({ isLoading: false });
    };
  };

  render() {
    const { acl, linked_token_manager_id, target_api } = this.props.enrollment;
    const actions = this.transformAclToActions(acl);
    const { isLoading, doShowPrompt, commentType } = this.state;

    return (
      <React.Fragment>
        <div className="button-list action">
          {linked_token_manager_id && (
            <a
              className="button large secondary action"
              href={getTokenUrl({
                targetApi: target_api,
                id: linked_token_manager_id,
              })}
            >
              Gérer l'accès à l'API
            </a>
          )}

          {actions.map(({ cssClass, icon, id, label, trigger }) => (
            <button
              key={id}
              className={`button large ${cssClass}`}
              onClick={trigger}
              disabled={isLoading}
            >
              <div className="button-icon">{icon}</div>
              <div>
                {label}
                {isLoading && <Spinner inline={true} />}
              </div>
            </button>
          ))}
        </div>

        {doShowPrompt && (
          <Prompt
            onAccept={this.submitActionMessage}
            onCancel={this.cancelActionMessage}
            commentType={commentType}
            targetApi={target_api}
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
