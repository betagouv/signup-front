import React from 'react';
import PropTypes from 'prop-types';
import { ScrollablePanel } from '../elements/Scrollable';
import ValidatedFranceconnectEnrollmentsSelector from '../form/ValidatedFranceconnectEnrollmentsSelector';

// TODO make this component more generic and being able to link to any previously validated enrollments
const FranceconnectSection = ({
  isUserEnrollmentLoading = true,
  disabled = false,
  onChange = () => null,
  enrollment: { linked_franceconnect_enrollment_id = null, target_api },
}) => (
  <ScrollablePanel scrollableId="franceconnect">
    <h2>Demande FranceConnect associée</h2>
    <div className="text-quote">
      <p>
        Afin de pouvoir utiliser votre bouton FranceConnect pour récupérer les
        données, merci de renseigner la demande FranceConnect à associer à cette
        demande.
      </p>
    </div>
    <br />
    {!isUserEnrollmentLoading && !disabled && (
      <ValidatedFranceconnectEnrollmentsSelector
        onValidatedFranceconnectEnrollment={onChange}
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

FranceconnectSection.propTypes = {
  isUserEnrollmentLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  enrollment: PropTypes.shape({
    target_api: PropTypes.string,
    linked_franceconnect_enrollment_id: PropTypes.number,
  }),
};

export default FranceconnectSection;
