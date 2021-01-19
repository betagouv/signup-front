import React, { useContext, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { getEnrollments } from '../../services/enrollments';
import { FormContext } from '../Form';
import { TARGET_API_LABELS } from '../../lib/api';

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
          {
            id: 'target_api',
            // if target_api is francerelance_api_ouverte or francerelance_api_restreinte
            // we want the unicity to be checked against the 2 targets
            value: target_api.startsWith('francerelance_api')
              ? 'francerelance_api'
              : target_api,
          },
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
      sans subvention :{' '}
      <a
        href={
          target_api === 'francerelance_fc'
            ? '/franceconnect'
            : 'https://api.gouv.fr/datapass/api'
        }
      >
        via ce lien
      </a>
      .
    </div>
  );
};

export default UniquenessWarningNotification;
