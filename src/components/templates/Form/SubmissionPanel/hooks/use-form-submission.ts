import { MouseEvent, useState } from 'react';
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

  const onActionButtonClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setLoading(true);
  };

  return {
    loading,
    waitingForUserInput,
    pendingAction,
    setPendingAction,
    pendingActionConfiguration,
    onActionButtonClick,
  };
};
