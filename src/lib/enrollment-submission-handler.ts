import { getErrorMessages } from '.';
import {
  ActionConfiguration,
  EnrollmentAction,
} from './enrollment-actions-configuration';
import {
  createOrUpdateEnrollment,
  deleteEnrollment,
  computeNextEnrollmentState,
} from '../services/enrollments';

export const handleSubmissionAction = async (
  action: EnrollmentAction,
  actionConfiguration: ActionConfiguration,
  enrollment: any,
  updateEnrollment: Function,
  message?: string,
  fullEditMode?: boolean
): Promise<{
  redirectToHome: boolean;
  successMessages: string[];
  errorMessages: string[];
}> => {
  const resultMessages = {
    errorMessages: [] as string[],
    successMessages: [] as string[],
    redirectToHome: false,
  };

  try {
    let comment = null;
    let commentFullEditMode = null;

    if (actionConfiguration.promptForComment) {
      try {
        comment = message;
        commentFullEditMode = fullEditMode;
      } catch (e) {
        return resultMessages;
      }
    }

    let enrollmentId = enrollment.id;

    if (enrollment.acl.update) {
      const newEnrollment = await createOrUpdateEnrollment({
        enrollment,
      });
      updateEnrollment(newEnrollment);
      enrollmentId = newEnrollment.id;

      resultMessages.successMessages.push('Votre demande a été sauvegardée.');
    }

    if (action === 'update') {
      return resultMessages;
    }

    if (action === 'destroy') {
      await deleteEnrollment({ id: enrollmentId });
    }

    if (actionConfiguration.needsToComputeNextEnrollmentState) {
      await computeNextEnrollmentState({
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
