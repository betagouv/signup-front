import { useState } from 'react';
import {
  EnrollmentAction,
  userInteractionsConfiguration,
} from '../../../../../lib/enrollment-actions-configuration';

export const useFormSubmission = (
  handleSubmit: Function,
  enrollment: any,
  updateEnrollment: Function,
  doAction: Function
) => {
  const [loading, setLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState<EnrollmentAction>();

  const waitingForUserInput =
    pendingAction !== undefined &&
    userInteractionsConfiguration[pendingAction]?.promptForComment === true;

  const pendingActionConfiguration =
    pendingAction !== undefined
      ? userInteractionsConfiguration[pendingAction]
      : undefined;

  const onActionButtonClick = async (action: EnrollmentAction) => {
    setLoading(true);
    setPendingAction(action);

    const actionConfiguration = userInteractionsConfiguration[action];
    if (!actionConfiguration.promptForComment) {
      handleSubmit(
        await doAction(
          pendingAction!,
          pendingActionConfiguration!,
          enrollment,
          updateEnrollment
        )
      );

      setLoading(false);
      setPendingAction(undefined);
    }
  };

  const onPromptConfirmation = async (
    message: string,
    fullEditMode: boolean
  ) => {
    handleSubmit(
      await doAction(
        pendingAction!,
        pendingActionConfiguration!,
        enrollment,
        updateEnrollment,
        message,
        fullEditMode
      )
    );

    setLoading(false);
    setPendingAction(undefined);
  };

  return {
    loading,
    waitingForUserInput,
    pendingAction,
    pendingActionConfiguration,
    onActionButtonClick,
    onPromptConfirmation,
  };
};
