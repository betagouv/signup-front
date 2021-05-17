import { userInteractionsConfiguration } from './enrollment-buttons-configuration';
jest.mock('../services/enrollments');
// eslint-disable-next-line import/first
import { handleEnrollmentSubmission } from './enrollment-submission-handler';
// eslint-disable-next-line import/first
import {
  computeNextEnrollmentState,
  deleteEnrollment,
} from '../services/enrollments';

describe('When submitting the enrollment form', () => {
  let userCancelsPrompt;
  let userValidatesPrompt;
  let waitForUserInteractionInPrompt;

  const setIntendedAction = jest.fn();
  const enrollment = { id: Symbol(), acl: {} };
  const updateEnrollment = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    waitForUserInteractionInPrompt = new Promise((resolve, reject) => {
      userValidatesPrompt = resolve;
      userCancelsPrompt = reject;
    });
  });

  describe('with the notify action', () => {
    const actionConfiguration = {
      id: 'notify',
      ...userInteractionsConfiguration.notify,
    };

    it('waits for user prompt', async () => {
      userCancelsPrompt();
      const output = await handleEnrollmentSubmission(
        actionConfiguration,
        setIntendedAction,
        enrollment,
        waitForUserInteractionInPrompt,
        updateEnrollment
      );

      expect(setIntendedAction).toHaveBeenCalledWith('notify');
      expect(computeNextEnrollmentState).not.toHaveBeenCalled();
      expect(output).toMatchSnapshot();
    });

    it('calls for the enrollment state update after user validates prompt', async () => {
      const userMessage = 'La barbe de la femme à Georges Moustaki';

      userValidatesPrompt({ message: userMessage, fullEditMode: false });
      const output = await handleEnrollmentSubmission(
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
      expect(output).toMatchSnapshot();
    });
  });

  describe('with the destroy action', () => {
    const actionConfiguration = {
      id: 'destroy',
      ...userInteractionsConfiguration.destroy,
    };

    it('calls the delete endpoint', async () => {
      const output = await handleEnrollmentSubmission(
        actionConfiguration,
        setIntendedAction,
        enrollment,
        waitForUserInteractionInPrompt,
        updateEnrollment
      );

      expect(deleteEnrollment).toHaveBeenCalledWith({
        id: enrollment.id,
      });
      expect(output).toMatchSnapshot();
    });
  });
});
