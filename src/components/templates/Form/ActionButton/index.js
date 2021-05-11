import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Prompt from './Prompt';
import DoneIcon from '../../../atoms/icons/done';
import Loader from '../../../atoms/Loader';
import { triggerAction } from './trigger-action';

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
  waitForUserInteractionInPrompt = () => {
    return new Promise((resolve, reject) => {
      this.acceptPrompt = resolve;
      this.cancelPrompt = reject;
    });
  };

  onPromptAccept = (message, fullEditMode) => {
    this.acceptPrompt({ message, fullEditMode });
  };

  onPromptCancel = () => {
    this.cancelPrompt();
  };

  render() {
    const {
      target_api,
      user: { email: ownerEmailAddress } = { email: null },
    } = this.props.enrollment;

    return (
      <TempRender
        transformAclToButtonsParams={transformAclToButtonsParams}
        formSubmitHandlerFactory={this.formSubmitHandlerFactory}
        enrollment={this.props.enrollment}
        target_api={target_api}
        ownerEmailAddress={ownerEmailAddress}
        onPromptAccept={this.onPromptAccept}
        onPromptCancel={this.onPromptCancel}
        handleSubmit={this.props.handleSubmit}
        waitForUserInteractionInPrompt={this.waitForUserInteractionInPrompt}
        updateEnrollment={this.props.updateEnrollment}
      />
    );
  }
}

const TempRender = ({
  transformAclToButtonsParams,
  enrollment,
  target_api,
  ownerEmailAddress,
  onPromptAccept,
  onPromptCancel,
  handleSubmit,
  waitForUserInteractionInPrompt,
  updateEnrollment,
}) => {
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [intendedAction, setIntendedAction] = useState('');

  const formSubmitHandlerFactory = (
    action,
    setLoading,
    setShowPrompt,
    setIntendedAction,
    handleSubmit,
    enrollment,
    waitForUserInteractionInPrompt,
    updateEnrollment
  ) => {
    return async event => {
      event.preventDefault();
      setLoading(true);

      const resultMessages = await triggerAction(
        action,
        setShowPrompt,
        setIntendedAction,
        enrollment,
        waitForUserInteractionInPrompt,
        updateEnrollment
      );

      setLoading(false);
      handleSubmit(resultMessages);
    };
  };
  const buttonsParams = transformAclToButtonsParams(enrollment.acl, action =>
    formSubmitHandlerFactory(
      action,
      setLoading,
      setShowPrompt,
      setIntendedAction,
      handleSubmit,
      enrollment,
      waitForUserInteractionInPrompt,
      updateEnrollment
    )
  );
  return (
    <>
      <div className="button-list action">
        {buttonsParams.map(({ cssClass, icon, id, label, trigger }) => (
          <button
            key={id}
            className={`button large enrollment ${cssClass}`}
            onClick={trigger}
            disabled={loading}
          >
            <div className="button-icon">{icon}</div>
            <div>
              {label}
              {loading && intendedAction === id && <Loader small />}
            </div>
          </button>
        ))}
      </div>

      {showPrompt && (
        <Prompt
          onAccept={(message, fullEditMode) => {
            setShowPrompt(false);
            setIntendedAction('');
            onPromptAccept(message, fullEditMode);
          }}
          onCancel={() => {
            setShowPrompt(false);
            setIntendedAction('');
            onPromptCancel();
          }}
          acceptLabel={actionToDisplayInfo[intendedAction].label}
          acceptCssClass={actionToDisplayInfo[intendedAction].cssClass}
          selectedAction={intendedAction}
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
