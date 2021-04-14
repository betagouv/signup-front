import React, { useContext, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { getEnrollments } from '../../../services/enrollments';
import { FormContext } from './index';
import { TARGET_API_LABELS } from '../../../lib/api';

const UniquenessWarningNotification = () => {
  const [enrollments, setEnrollments] = useState([]);
  const {
    enrollment: { id: enrollmentId, siret, target_api },
  } = useContext(FormContext);

  useEffect(() => {
    async function fetchEnrollments() {
      if (!target_api || !siret) return setEnrollments([]);

      const { enrollments: fetchedEnrollments } = await getEnrollments({
        page: 0,
        sortBy: [{ id: 'updated_at', desc: true }],
        filter: [
          { id: 'target_api', value: target_api },
          { id: 'status', value: 'validated' },
          { id: 'siret', value: siret },
        ],
      });
      const filteredEnrollments = fetchedEnrollments.filter(
        ({ id }) => id !== enrollmentId
      );

      setEnrollments(filteredEnrollments);
    }

    fetchEnrollments();
  }, [enrollmentId, siret, target_api]);

  if (isEmpty(enrollments)) {
    return null;
  }

  return (
    <div className="notification warning">
      Votre organisation à déjà obtenu une subvention dans le cadre de{' '}
      {TARGET_API_LABELS[target_api]} :
      {enrollments.map(enrollment => (
        <span key={enrollment.id}>
          {' '}
          <a href={`/authorization-request/${enrollment.id}`}>
            la demande #{enrollment.id}
          </a>
        </span>
      ))}
      . Vous ne pouvez donc pas souscrire à une seconde habilitation
      subventionnée. Vous pouvez cependant souscrire à une seconde habilitation
      sans subvention : <a href="/franceconnect">via ce lien</a>.
    </div>
  );
};

export default UniquenessWarningNotification;
