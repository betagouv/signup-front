import { useState, useEffect } from 'react';
import { hasAccessToEnrollment } from '../../lib/services';

const useAccessToEnrollment = enrollmentId => {
  const [
    hasAccessToPreviousEnrollment,
    setHasAccessToPreviousEnrollment,
  ] = useState(false);

  useEffect(() => {
    async function fetchHasAccessToEnrollment() {
      if (!enrollmentId) return null;

      const result = await hasAccessToEnrollment(enrollmentId);

      setHasAccessToPreviousEnrollment(result);
    }

    fetchHasAccessToEnrollment();
  }, [enrollmentId]);

  return hasAccessToPreviousEnrollment;
};

export default useAccessToEnrollment;
