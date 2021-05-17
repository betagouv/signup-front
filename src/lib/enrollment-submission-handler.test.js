jest.mock('../services/enrollments');
// eslint-disable-next-line import/first
import { handleEnrollmentSubmission } from './enrollment-submission-handler';
// eslint-disable-next-line import/first
import { computeNextEnrollmentState } from '../services/enrollments';

describe('When submitting the enrollment form', () => {
  describe('notifying the author', () => {
    let userCancelsPrompt;
    let userValidatesPrompt;
    let waitForUserInteractionInPrompt;
    const actionConfiguration = {
      id: 'notify',
      promptForComment: true,
      needsToComputeNextEnrollmentState: true,
    };

    const setIntendedAction = jest.fn();
    const enrollment = { id: Symbol(), acl: {} };
    const updateEnrollment = jest.fn();

    beforeEach(() => {
      waitForUserInteractionInPrompt = new Promise((resolve, reject) => {
        userValidatesPrompt = resolve;
        userCancelsPrompt = reject;
      });
    });

    it('waits for user prompt', async () => {
      userCancelsPrompt();
      await handleEnrollmentSubmission(
        actionConfiguration,
        setIntendedAction,
        enrollment,
        waitForUserInteractionInPrompt,
        updateEnrollment
      );

      expect(setIntendedAction).toHaveBeenCalledWith('notify');
      expect(computeNextEnrollmentState).not.toHaveBeenCalled();
    });

    it('calls for the enrollment state update after user validates prompt', async () => {
      const userMessage = 'La barbe de la femme à Georges Moustaki';

      userValidatesPrompt({ message: userMessage, fullEditMode: false });
      await handleEnrollmentSubmission(
        actionConfiguration,
        setIntendedAction,
        enrollment,
        waitForUserInteractionInPrompt,
        updateEnrollment
      );

      expect(computeNextEnrollmentState).toHaveBeenCalledWith({
        action: 'notify',
        comment: userMessage,
        commentFullEditMode: false,
        id: enrollment.id,
      });
    });
  });
});
