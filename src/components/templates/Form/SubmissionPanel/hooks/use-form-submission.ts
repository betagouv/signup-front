import { useState } from 'react';
import {
  EnrollmentAction,
  userInteractionsConfiguration,
} from '../../../../../lib/enrollment-actions-configuration';

export const useFormSubmission = () => {
  const [loading, setLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState<EnrollmentAction>();

  const waitingForUserInput =
    pendingAction !== undefined &&
    userInteractionsConfiguration[pendingAction]?.promptForComment === true;

  const pendingActionConfiguration =
    pendingAction !== undefined
      ? userInteractionsConfiguration[pendingAction]
      : undefined;

  return {
    loading,
    waitingForUserInput,
    pendingAction,
    setPendingAction,
    pendingActionConfiguration,
  };
};
