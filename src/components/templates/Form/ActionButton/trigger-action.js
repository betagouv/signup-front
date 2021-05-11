import { getErrorMessages } from '../../../../lib';
import {
  createOrUpdateEnrollment,
  deleteEnrollment,
  triggerEnrollment,
} from '../../../../services/enrollments';

export const triggerAction = async (
  action,
  setShowPrompt,
  setIntendedAction,
  enrollment,
  waitForUserInteractionInPrompt,
  updateEnrollment
) => {
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
        setShowPrompt(true);
        setIntendedAction(action);

        const actionMessage = await waitForUserInteractionInPrompt();
        comment = actionMessage.message;
        commentFullEditMode = actionMessage.fullEditMode;
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
