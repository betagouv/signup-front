import { renderHook } from '@testing-library/react-hooks';
import { useFormSubmission } from './use-form-submission';

describe('The form submission hook', () => {
  it('returns nothing', () => {
    const { result } = renderHook(() => useFormSubmission());
    expect(result.current).toBeUndefined();
  });
});
