import React, { useEffect, useState } from 'react';
import { getEnrollmentCopies } from '../../lib/services';
import { isEmpty } from 'lodash';

const EnrollmentHasCopiesNotification = ({ enrollmentId }) => {
  const [enrollmentCopies, setEnrollmentCopies] = useState(false);

  useEffect(() => {
    async function fetchEnrollmentCopies() {
      if (!enrollmentId) return setEnrollmentCopies(false);

      const enrollmentsCopies = await getEnrollmentCopies(enrollmentId);

      setEnrollmentCopies(enrollmentsCopies);
    }

    fetchEnrollmentCopies();
  }, [enrollmentId]);

  if (isEmpty(enrollmentCopies)) return null;

  const enrollmentCopyId = enrollmentCopies[0].id;

  return (
    <div className="notification warning">
      La demande{' '}
      <a href={`/authorization-request/${enrollmentCopyId}`}>
        #{enrollmentCopyId}
      </a>{' '}
      est une copie plus récente de cette demande.
    </div>
  );
};

export default EnrollmentHasCopiesNotification;
