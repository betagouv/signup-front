import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { EnrollmentAction } from '../../../../../lib/enrollment-actions-configuration';
import { useFormSubmission } from './use-form-submission';

describe('The form submission hook', () => {
  it('sets default state when mounted for the first time', () => {
    const { result } = renderHook(() => useFormSubmission());

    expect(result.current.loading).toBeFalsy();
    expect(result.current.pendingAction).toBeUndefined();
  });

  it('waits for user input when pending action is set', () => {
    const { result } = renderHook(() => useFormSubmission());

    expect(result.current.waitingForUserInput).toBeFalsy();

    act(() => {
      result.current.setPendingAction(EnrollmentAction.notify);
    });

    expect(result.current.waitingForUserInput).toBeTruthy();
  });
});
