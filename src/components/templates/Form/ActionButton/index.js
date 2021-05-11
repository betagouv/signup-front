import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  createOrUpdateEnrollment,
  deleteEnrollment,
  triggerEnrollment,
} from '../../../../services/enrollments';
import Prompt from './Prompt';
import { getErrorMessages } from '../../../../lib';
import DoneIcon from '../../../atoms/icons/done';
import Loader from '../../../atoms/Loader';

const actionToDisplayInfo = {
  notify: {
    label: 'Envoyer un message',
    cssClass: 'secondary',
  },
  destroy: {
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

const transformAclToButtonsParams = (acl, formSubmitHandlerFactory) =>
  // acl = {'send_application': true, 'review_application': false, 'create': true}
  _(actionToDisplayInfo)
    .pickBy((value, key) => acl[key])
    // {'send_application': {label: ..., cssClass: ...}}
    .keys()
    // ['send_application']
    .map(action => ({
      id: action,
      label: actionToDisplayInfo[action].label,
      icon: actionToDisplayInfo[action].icon,
      cssClass: actionToDisplayInfo[action].cssClass,
      trigger: formSubmitHandlerFactory(action),
    }))
    // [{id: 'send_application', trigger: ..., label: 'Envoyer'}]
    .value();

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showPrompt: false,
      selectedAction: '',
    };
  }

  waitForUserInteractionInPrompt = () => {
    return new Promise((resolve, reject) => {
      this.acceptPrompt = resolve;
      this.cancelPrompt = reject;
    });
  };

  onPromptAccept = (message, fullEditMode) => {
    this.acceptPrompt({ message, fullEditMode });

    this.setState({ showPrompt: false, selectedAction: '' });
  };

  onPromptCancel = () => {
    this.cancelPrompt();

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
          this.setState({ showPrompt: true, selectedAction: action });

          const actionMessage = await this.waitForUserInteractionInPrompt();
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

      if (action === 'destroy') {
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

  formSubmitHandlerFactory = action => {
    return async event => {
      event.preventDefault();
      this.setState({ isLoading: true });

      const resultMessages = await this.triggerAction(action);

      this.setState({ isLoading: false });
      this.props.handleSubmit(resultMessages);
    };
  };

  render() {
    const {
      target_api,
      user: { email: ownerEmailAddress } = { email: null },
    } = this.props.enrollment;
    const { isLoading, showPrompt, selectedAction } = this.state;

    return tempRender({
      transformAclToButtonsParams,
      formSubmitHandlerFactory: this.formSubmitHandlerFactory,
      enrollment: this.props.enrollment,
      isLoading,
      selectedAction,
      showPrompt,
      target_api,
      ownerEmailAddress,
      onPromptAccept: this.onPromptAccept,
      onPromptCancel: this.onPromptCancel,
    });
  }
}

const tempRender = ({
  transformAclToButtonsParams,
  enrollment,
  isLoading,
  selectedAction,
  showPrompt,
  target_api,
  ownerEmailAddress,
  onPromptAccept,
  onPromptCancel,
  formSubmitHandlerFactory,
}) => {
  const buttonsParams = transformAclToButtonsParams(
    enrollment.acl,
    formSubmitHandlerFactory
  );
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
              {isLoading && selectedAction === id && <Loader small />}
            </div>
          </button>
        ))}
      </div>

      {showPrompt && (
        <Prompt
          onAccept={onPromptAccept}
          onCancel={onPromptCancel}
          acceptLabel={actionToDisplayInfo[selectedAction].label}
          acceptCssClass={actionToDisplayInfo[selectedAction].cssClass}
          selectedAction={selectedAction}
          targetApi={target_api}
          ownerEmailAddress={ownerEmailAddress}
        />
      )}
    </>
  );
};

ActionButton.propTypes = {
  enrollment: PropTypes.object.isRequired,
  updateEnrollment: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ActionButton;
