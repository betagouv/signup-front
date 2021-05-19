import { useState } from 'react';
import {
  EnrollmentAction,
  userInteractionsConfiguration,
} from '../../../../../lib/enrollment-actions-configuration';

export const useFormSubmission = (
  handleSubmit: Function,
  enrollment: any,
  updateEnrollment: Function
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
  };

  return {
    loading,
    waitingForUserInput,
    pendingAction,
    pendingActionConfiguration,
    onActionButtonClick,
  };
};
