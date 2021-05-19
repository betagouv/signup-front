import { useState } from 'react';
import { EnrollmentAction } from '../../../../../lib/enrollment-actions-configuration';

export const useFormSubmission = () => {
  const [loading, setLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState<EnrollmentAction>();

  const waitingForUserInput = pendingAction !== undefined;

  return {
    loading,
    waitingForUserInput,
    pendingAction,
    setPendingAction,
  };
};
