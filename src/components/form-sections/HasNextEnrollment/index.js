import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { getNextEnrollment } from '../../../lib/services';

const HasNextEnrollment = ({ enrollmentId }) => {
  const [nextEnrollment, setNextEnrollment] = useState(false);

  useEffect(() => {
    async function fetchNextEnrollment() {
      if (!enrollmentId) return setNextEnrollment(false);

      const fetchedNextEnrollment = await getNextEnrollment(enrollmentId);

      setNextEnrollment(fetchedNextEnrollment);
    }

    fetchNextEnrollment();
  }, [enrollmentId]);

  if (isEmpty(nextEnrollment)) {
    console.log('caca');
    return null;
  }

  const nextEnrollementId = nextEnrollment[0].id;
  const nextEnrollementTargetAPI = nextEnrollment[0].target_api;

  return (
    <div className="notification info">
      Cette demande est liée à la demande {nextEnrollementTargetAPI || ''}{' '}
      suivante : la{' '}
      <a href={`/authorization-request/${nextEnrollementId}`}>
        #{nextEnrollementId}
      </a>
      .
    </div>
  );
};

export default HasNextEnrollment;
