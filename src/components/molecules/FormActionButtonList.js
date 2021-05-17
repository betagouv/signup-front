import _ from 'lodash';
import { useState } from 'react';
import { userInteractionsConfiguration } from '../../lib/enrollment-buttons-configuration';
import FormActionButton from '../atoms/FormActionButton';
import { triggerAction } from '../templates/Form/SubmissionPanel/trigger-action';

const transformAclToButtonsParams = (acl, formSubmitHandlerFactory) =>
  // acl = {'send_application': true, 'review_application': false, 'create': true}
  _(userInteractionsConfiguration)
    .pickBy((value, key) => acl[key])
    // {'send_application': {label: ..., cssClass: ...}}
    .keys()
    // ['send_application']
    .map(action => ({
      id: action,
      ...userInteractionsConfiguration[action],
      trigger: formSubmitHandlerFactory(
        action,
        userInteractionsConfiguration[action]
      ),
    }))
    // [{id: 'send_application', trigger: ..., label: 'Envoyer'}]
    .value();

const FormActionButtonList = ({
  pendingAction,
  setPendingAction,
  handleSubmit,
  enrollment,
  updateEnrollment,
  confirmPrompt,
  cancelPrompt,
}) => {
  const [loading, setLoading] = useState(false);

  const formSubmitHandlerFactory = (
    action,
    actionConfiguration,
    setLoading,
    setPendingAction,
    handleSubmit,
    enrollment,
    updateEnrollment
  ) => {
    return async event => {
      event.preventDefault();
      setLoading(true);

      const userInteractionPromise = new Promise((resolve, reject) => {
        confirmPrompt.current = resolve;
        cancelPrompt.current = reject;
      });
      const resultMessages = await triggerAction(
        action,
        actionConfiguration,
        setPendingAction,
        enrollment,
        userInteractionPromise,
        updateEnrollment
      );

      setLoading(false);
      handleSubmit(resultMessages);
    };
  };
  const buttonsParams = transformAclToButtonsParams(
    enrollment.acl,
    (action, actionConfiguration) =>
      formSubmitHandlerFactory(
        action,
        actionConfiguration,
        setLoading,
        setPendingAction,
        handleSubmit,
        enrollment,
        updateEnrollment
      )
  );
  return (
    <div className="button-list action">
      {buttonsParams.map(props => (
        <FormActionButton
          {...props}
          key={props.id}
          loading={loading}
          pendingAction={pendingAction}
        />
      ))}
    </div>
  );
};

export default FormActionButtonList;
