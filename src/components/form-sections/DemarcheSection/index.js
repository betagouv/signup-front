import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import DemarcheSectionReadOnly from './DemarcheSectionReadOnly';
import DemarcheSectionSelect from './DemarcheSectionSelect';
import { FormContext } from '../../Form';

export const DemarcheSection = ({ demarches }) => {
  const {
    enrollment: { id: enrollmentId },
    disabled,
  } = useContext(FormContext);

  return (
    <>
      {enrollmentId && disabled ? (
        <DemarcheSectionReadOnly demarches={demarches} />
      ) : (
        <DemarcheSectionSelect demarches={demarches} />
      )}
    </>
  );
};

DemarcheSection.propTypes = {
  demarches: PropTypes.object.isRequired,
};

export default DemarcheSection;
