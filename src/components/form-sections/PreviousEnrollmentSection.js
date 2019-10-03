import React from 'react';
import PropTypes from 'prop-types';
import { ScrollablePanel } from '../elements/Scrollable';
import ValidatedEnrollmentsSelector from '../form/ValidatedEnrollmentsSelector';
import { TARGET_API_LABELS } from '../../pages/EnrollmentList';

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
  isUserEnrollmentLoading = true,
  disabled = false,
  onChange = () => null,
  enrollment: { linked_franceconnect_enrollment_id = null, target_api },
}) => (
  <ScrollablePanel scrollableId="franceconnect">
    <h2>Demande {TARGET_API_LABELS[previousTargetApi]} associée</h2>
    <Description />
    <br />
    {!isUserEnrollmentLoading && !disabled && (
      <ValidatedEnrollmentsSelector
        onValidatedEnrollment={onChange}
        linkedTargetApi={previousTargetApi}
        enrollmentTargetApi={target_api}
        linked_franceconnect_enrollment_id={linked_franceconnect_enrollment_id}
      />
    )}
    {disabled && (
      <div className="button-list enrollment">
        <a
          href={`/franceconnect/${linked_franceconnect_enrollment_id}`}
          className="button-outline secondary"
        >
          Voir la demande associée
        </a>
      </div>
    )}
  </ScrollablePanel>
);

PreviousEnrollmentSection.propTypes = {
  previousTargetApi: PropTypes.string,
  Description: PropTypes.func,
  isUserEnrollmentLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  enrollment: PropTypes.shape({
    target_api: PropTypes.string,
    linked_franceconnect_enrollment_id: PropTypes.number,
  }),
};

export default PreviousEnrollmentSection;
