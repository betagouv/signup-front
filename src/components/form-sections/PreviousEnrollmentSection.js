import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { TARGET_API_LABELS } from '../../lib/api';

import useAccessToEnrollment from '../hooks/useAccessToEnrollment';

import { ScrollablePanel } from '../elements/Scrollable';

import ValidatedEnrollmentsSelector from '../form/ValidatedEnrollmentsSelector';

import { FormContext } from '../Form';

const PreviousEnrollmentSection = ({
  previousTargetApi = 'franceconnect',
  Description = () => (
    <div className="text-quote">
      <p>
        Afin de pouvoir utiliser votre bouton FranceConnect pour récupérer les
        données, merci de renseigner la demande FranceConnect à associer à cette
        demande.
      </p>
    </div>
  ),
}) => {
  const {
    isUserEnrollmentLoading,
    disabled,
    onChange,
    enrollment: { linked_franceconnect_enrollment_id = null, target_api },
  } = useContext(FormContext);

  const hasAccessToPreviousEnrollment = useAccessToEnrollment(
    linked_franceconnect_enrollment_id
  );

  return (
    <ScrollablePanel scrollableId="franceconnect">
      <h2>Démarche {TARGET_API_LABELS[previousTargetApi]} associée</h2>
      <Description />
      <br />
      {!isUserEnrollmentLoading && !disabled && (
        <ValidatedEnrollmentsSelector
          onValidatedEnrollment={onChange}
          linkedTargetApi={previousTargetApi}
          enrollmentTargetApi={target_api}
          linked_franceconnect_enrollment_id={
            linked_franceconnect_enrollment_id
          }
        />
      )}
      {disabled && (
        <div className="button-list enrollment">
          {hasAccessToPreviousEnrollment ? (
            <a
              href={`/franceconnect/${linked_franceconnect_enrollment_id}`}
              className="light"
            >
              Numéro de la demande associée :{' '}
              {linked_franceconnect_enrollment_id}
            </a>
          ) : (
            <>
              Numéro de la demande associée :{' '}
              {linked_franceconnect_enrollment_id}
            </>
          )}
        </div>
      )}
    </ScrollablePanel>
  );
};

PreviousEnrollmentSection.propTypes = {
  previousTargetApi: PropTypes.string,
  Description: PropTypes.func,
};

export default PreviousEnrollmentSection;
