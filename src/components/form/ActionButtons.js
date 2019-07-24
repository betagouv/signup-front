import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  createOrUpdateEnrollment,
  triggerEnrollment,
} from '../../lib/services';
import Prompt from '../elements/Prompt';
import { getErrorMessages } from '../../lib/utils';
import Spinner from '../icons/spinner';

const { REACT_APP_API_PARTICULIER_HOST: API_PARTICULIER_HOST } = process.env;

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
    update: {
      label: 'Sauvegarder le brouillon',
      cssClass: 'secondary enrollment',
    },
    send_application: {
      label: 'Soumettre la demande',
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

      await triggerEnrollment({
        action,
        id: enrollmentId,
        comment,
      });

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
        <div className="button-list enrollment">
          {linked_token_manager_id && (
            <a
              className="button large secondary enrollment"
              href={`${API_PARTICULIER_HOST}/admin/token/${linked_token_manager_id}`}
            >
              Gérer l'accès à l'API
            </a>
          )}

          {actions.map(({ cssClass, id, label, trigger }) => (
            <button
              key={id}
              className={`button large ${cssClass}`}
              onClick={trigger}
              disabled={isLoading}
            >
              {label}
              {isLoading && <Spinner inline={true} />}
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
