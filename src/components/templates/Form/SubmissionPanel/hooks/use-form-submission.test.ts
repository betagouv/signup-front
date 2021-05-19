import { renderHook } from '@testing-library/react-hooks';
import { MouseEvent } from 'react';
import { act } from 'react-dom/test-utils';
import { mock } from 'jest-mock-extended';
import {
  EnrollmentAction,
  userInteractionsConfiguration,
} from '../../../../../lib/enrollment-actions-configuration';
import { useFormSubmission } from './use-form-submission';

describe('The form submission hook', () => {
  it('sets default state when mounted for the first time', () => {
    const { result } = renderHook(() => useFormSubmission());

    expect(result.current.loading).toBeFalsy();
    expect(result.current.pendingAction).toBeUndefined();
  });

  it('waits for user input when an action needing user input is pending', () => {
    const { result } = renderHook(() => useFormSubmission());

    expect(result.current.waitingForUserInput).toBeFalsy();

    act(() => {
      result.current.setPendingAction(EnrollmentAction.notify);
    });

    expect(result.current.waitingForUserInput).toBeTruthy();

    act(() => {
      result.current.setPendingAction(EnrollmentAction.update);
    });

    expect(result.current.waitingForUserInput).toBeFalsy();
  });

  it('provides action configuration when an action is pending', () => {
    const { result } = renderHook(() => useFormSubmission());

    act(() => {
      result.current.setPendingAction(EnrollmentAction.notify);
    });

    expect(result.current.pendingActionConfiguration).toBe(
      userInteractionsConfiguration.notify
    );
  });

  it('provides a button click handler', () => {
    const { result } = renderHook(() => useFormSubmission());
    const event = mock<MouseEvent<HTMLElement>>();

    act(() => {
      result.current.setPendingAction(EnrollmentAction.notify);
      result.current.onActionButtonClick(event);
    });

    expect(result.current.loading).toBeTruthy();
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
