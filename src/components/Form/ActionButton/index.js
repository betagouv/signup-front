import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  createOrUpdateEnrollment,
  deleteEnrollment,
  triggerEnrollment,
} from '../../../services/enrollments';
import Prompt from './Prompt';
import { getErrorMessages } from '../../../lib';
import Spinner from '../../icons/spinner';
import DoneIcon from '../../icons/done';
import { PrefilledFormUrlGenerator } from './PrefilledFormUrlGenerator';

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showPrompt: false,
      selectedAction: '',
    };
  }

  actionToDisplayInfo = {
    notify: {
      label: 'Envoyer un message',
      cssClass: 'secondary',
    },
    delete: {
      label: 'Supprimer la demande',
      cssClass: 'warning',
    },
    update: {
      label: 'Sauvegarder le brouillon',
      cssClass: 'secondary',
    },
    send_application: {
      label: 'Soumettre la demande',
      icon: <DoneIcon color="white" />,
      cssClass: 'primary',
    },
    refuse_application: {
      label: 'Refuser',
      cssClass: 'warning',
    },
    review_application: {
      label: 'Demander une modification',
      cssClass: 'secondary',
    },
    validate_application: {
      label: 'Valider',
      cssClass: 'primary',
    },
  };

  transformAclToButtonsParams = acl =>
    // acl = {'send_application': true, 'review_application': false, 'create': true}
    _(this.actionToDisplayInfo)
      .pickBy((value, key) => acl[key])
      // {'send_application': {label: ..., cssClass: ...}}
      .keys()
      // ['send_application']
      .map(action => ({
        id: action,
        label: this.actionToDisplayInfo[action].label,
        icon: this.actionToDisplayInfo[action].icon,
        cssClass: this.actionToDisplayInfo[action].cssClass,
        trigger: this.handleSubmitFactory(action),
      }))
      // [{id: 'send_application', trigger: ..., label: 'Envoyer'}]
      .value();

  getActionMessage = action => {
    this.setState({ showPrompt: true, selectedAction: action });

    return new Promise((resolve, reject) => {
      this.resolveActionMessagePromise = resolve;
      this.rejectActionMessagePromise = reject;
    });
  };

  submitActionMessage = (message, fullEditMode) => {
    this.resolveActionMessagePromise({ message, fullEditMode });

    this.setState({ showPrompt: false, selectedAction: '' });
  };

  cancelActionMessage = () => {
    this.rejectActionMessagePromise();

    this.setState({ showPrompt: false, selectedAction: '' });
  };

  triggerAction = async action => {
    const resultMessages = {
      errorMessages: [],
      successMessages: [],
      redirectToHome: false,
    };

    try {
      let comment = null;
      let commentFullEditMode = null;

      if (
        [
          'notify',
          'review_application',
          'refuse_application',
          'validate_application',
        ].includes(action)
      ) {
        try {
          const actionMessage = await this.getActionMessage(action);
          comment = actionMessage.message;
          commentFullEditMode = actionMessage.fullEditMode;
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
          commentFullEditMode,
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
    const {
      acl,
      target_api,
      user: { email: ownerEmailAddress } = { email: null },
    } = this.props.enrollment;
    const buttonsParams = this.transformAclToButtonsParams(acl);
    const { isLoading, showPrompt, selectedAction } = this.state;

    return (
      <>
        <div className="button-list action">
          {buttonsParams.map(({ cssClass, icon, id, label, trigger }) => (
            <button
              key={id}
              className={`button large enrollment ${cssClass}`}
              onClick={trigger}
              disabled={isLoading}
            >
              <div className="button-icon">{icon}</div>
              <div>
                {label}
                {isLoading && selectedAction === id && (
                  <Spinner inline={true} />
                )}
              </div>
            </button>
          ))}
        </div>

        {showPrompt && (
          <Prompt
            onAccept={this.submitActionMessage}
            onCancel={this.cancelActionMessage}
            acceptLabel={this.actionToDisplayInfo[selectedAction].label}
            acceptCssClass={this.actionToDisplayInfo[selectedAction].cssClass}
            selectedAction={selectedAction}
            targetApi={target_api}
            ownerEmailAddress={ownerEmailAddress}
          />
        )}

        <PrefilledFormUrlGenerator enrollment={this.props.enrollment} />
      </>
    );
  }
}

ActionButton.propTypes = {
  enrollment: PropTypes.object.isRequired,
  updateEnrollment: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ActionButton;
