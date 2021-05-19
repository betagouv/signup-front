import { renderHook } from '@testing-library/react-hooks';
import { useFormSubmission } from './use-form-submission';

describe('The form submission hook', () => {
  it('sets loading to false when mounted for the first time', () => {
    const { result } = renderHook(() => useFormSubmission());
    expect(result.current.loading).toBeFalsy();
  });
});
