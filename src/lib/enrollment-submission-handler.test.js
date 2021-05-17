import { computeNextEnrollmentState } from '../services/enrollments';
import { handleEnrollmentSubmission } from './enrollment-submission-handler';
jest.mock('../services/enrollments');

describe('When submitting the enrollment form', () => {
  describe('notifying the author', () => {
    it('waits for user prompt', async () => {
      let userCancelsPrompt;
      const setIntendedAction = jest.fn();
      const enrollment = { acl: {} };
      const waitForUserInteractionInPrompt = new Promise((resolve, reject) => {
        userCancelsPrompt = reject;
      });
      const updateEnrollment = jest.fn();

      userCancelsPrompt();

      await handleEnrollmentSubmission(
        {
          id: 'notify',
          promptForComment: true,
          needsToComputeNextEnrollmentState: true,
        },
        setIntendedAction,
        enrollment,
        waitForUserInteractionInPrompt,
        updateEnrollment
      );

      expect(setIntendedAction).toHaveBeenCalledWith('notify');
      expect(computeNextEnrollmentState).not.toHaveBeenCalled();
    });
  });
});
