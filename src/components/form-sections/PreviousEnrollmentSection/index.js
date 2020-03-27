import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TARGET_API_LABELS } from '../../../lib/api';
import useAccessToEnrollment from './useAccessToEnrollment';
import { FormContext } from '../../Form';
import { getUserValidatedEnrollments } from '../../../lib/services';
import { Link } from 'react-router-dom';
import Stepper from './Stepper';

const PreviousEnrollmentSection = ({
  steps,
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
    enrollment: { previous_enrollment_id = null, target_api },
  } = useContext(FormContext);

  // disable fetch if not disabled or is loading
  const hasAccessToPreviousEnrollment = useAccessToEnrollment(
    disabled && !isUserEnrollmentLoading && previous_enrollment_id
  );

  const [validatedEnrollments, setValidatedEnrollments] = useState([]);
  const [
    isValidatedEnrollmentsLoading,
    setIsValidatedEnrollmentsLoading,
  ] = useState(true);
  const [validatedEnrollmentsError, setValidatedEnrollmentsError] = useState(
    false
  );

  useEffect(() => {
    const fetchUserValidatedEnrollments = async () => {
      try {
        setIsValidatedEnrollmentsLoading(true);
        setValidatedEnrollmentsError(false);
        const previousTargetApi =
          steps[steps.findIndex(e => e === target_api) - 1];
        const enrollments = await getUserValidatedEnrollments(
          previousTargetApi
        );
        setValidatedEnrollments(enrollments);
        setIsValidatedEnrollmentsLoading(false);
      } catch (e) {
        setValidatedEnrollmentsError(true);
        setIsValidatedEnrollmentsLoading(false);
      }
    };

    if (!disabled && !isUserEnrollmentLoading) {
      fetchUserValidatedEnrollments();
    }
  }, [steps, target_api, isUserEnrollmentLoading, disabled]);

  // initialize previous_enrollment_id if needed
  useEffect(() => {
    if (
      !disabled &&
      !isUserEnrollmentLoading &&
      !previous_enrollment_id &&
      validatedEnrollments.length > 0
    ) {
      onChange({
        target: {
          name: 'previous_enrollment_id',
          value: validatedEnrollments[0].id,
        },
      });
    }
  });

  const handleValidatedEnrollmentChange = event => {
    const id = event.target.value;

    onChange({
      target: {
        name: 'previous_enrollment_id',
        value: id,
      },
    });
  };

  const previousTargetApi = steps[steps.findIndex(e => e === target_api) - 1];

  return (
    <>
      {!disabled && !isUserEnrollmentLoading && (
        <>
          <p>
            La procédure consiste en {steps.length} demandes d'accès
            distinctes&nbsp;:
          </p>
          <Stepper
            steps={steps}
            currentStep={!isValidatedEnrollmentsLoading && target_api}
            previousStepNotCompleted={
              !isValidatedEnrollmentsLoading &&
              validatedEnrollments.length === 0
            }
          />
        </>
      )}
      {!disabled &&
        !isUserEnrollmentLoading &&
        !isValidatedEnrollmentsLoading &&
        validatedEnrollments.length === 0 && (
          <div className="form__group">
            <div className="notification warning">
              <p>
                Pour demander l'accès à <b>{TARGET_API_LABELS[target_api]}</b>,
                vous devez avoir préalablement obtenu un accès à{' '}
                <b>{TARGET_API_LABELS[previousTargetApi]}</b>.
              </p>
              <p>
                Veuillez{' '}
                <Link
                  to={{
                    pathname: `/${previousTargetApi.replace(/_/g, '-')}`,
                    state: { fromFranceConnectedAPI: target_api },
                  }}
                >
                  demander votre accès à{' '}
                  <b>{TARGET_API_LABELS[previousTargetApi]}</b>
                </Link>{' '}
                avant de continuer cette demande.
              </p>
            </div>
          </div>
        )}
      <div className="panel">
        <h2>Démarche {TARGET_API_LABELS[previousTargetApi]} associée</h2>
        <Description />
        <br />
        {!disabled &&
          !isUserEnrollmentLoading &&
          isValidatedEnrollmentsLoading && (
            <div className="form__group">
              <h4>
                Association à votre demande{' '}
                <b>{TARGET_API_LABELS[previousTargetApi]}</b>
              </h4>
              <p>
                Chargement de vos demandes{' '}
                <b>{TARGET_API_LABELS[previousTargetApi]}</b>
                ...
              </p>
            </div>
          )}
        {!disabled && !isUserEnrollmentLoading && validatedEnrollmentsError && (
          <div className="form__group">
            <div className="notification error">
              Erreur inconnue lors de la récupération de vos demandes{' '}
              {TARGET_API_LABELS[previousTargetApi]}.
            </div>
          </div>
        )}
        {!disabled &&
          !isUserEnrollmentLoading &&
          !isValidatedEnrollmentsLoading &&
          validatedEnrollments.length > 0 && (
            <div className="form__group">
              <label htmlFor="validated_enrollments">
                Nom de la démarche <b>{TARGET_API_LABELS[previousTargetApi]}</b>
                &nbsp;:
              </label>
              <select
                onChange={handleValidatedEnrollmentChange}
                id="validated_enrollments"
                value={previous_enrollment_id}
              >
                {validatedEnrollments.map(({ intitule: name, id }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          )}
        {disabled && !isUserEnrollmentLoading && (
          <div className="button-list enrollment">
            {hasAccessToPreviousEnrollment ? (
              <a
                href={`/${previousTargetApi.replace(
                  /_/g,
                  '-'
                )}/${previous_enrollment_id}`}
                className="light"
              >
                Numéro de la demande associée : {previous_enrollment_id}
              </a>
            ) : (
              <>Numéro de la demande associée : {previous_enrollment_id}</>
            )}
          </div>
        )}
      </div>
    </>
  );
};

PreviousEnrollmentSection.propTypes = {
  previousTargetApi: PropTypes.string,
  Description: PropTypes.func,
};

export default PreviousEnrollmentSection;
