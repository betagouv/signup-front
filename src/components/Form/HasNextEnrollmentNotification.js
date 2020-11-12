import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { TARGET_API_LABELS } from '../../lib/api';
import { getNextEnrollments } from '../../lib/services';

const HasNextEnrollmentNotification = ({ enrollmentId }) => {
  const [nextEnrollment, setNextEnrollment] = useState(false);

  useEffect(() => {
    async function fetchNextEnrollment() {
      if (!enrollmentId) return setNextEnrollment(false);

      const fetchedNextEnrollment = await getNextEnrollments(enrollmentId);

      setNextEnrollment(fetchedNextEnrollment);
    }

    fetchNextEnrollment();
  }, [enrollmentId]);

  if (isEmpty(nextEnrollment)) {
    return null;
  }

  const nextEnrollments = nextEnrollment.map(enrollemnt => {
    const { id, target_api } = enrollemnt;
    return { id, api: TARGET_API_LABELS[target_api] || target_api };
  });

  const severalNext = nextEnrollment.length > 1;

  return (
    <div className="notification info">
      Cette demande est liée{' '}
      {severalNext ? 'aux demandes suivantes' : 'à la demande suivante'} :
      {nextEnrollments.map(enrollment => (
        <ul>
          <li>
            <a href={`/authorization-request/${enrollment.id}`}>
              Demande {enrollment.api} : #{enrollment.id}
            </a>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default HasNextEnrollmentNotification;
