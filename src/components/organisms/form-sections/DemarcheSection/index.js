import React, { useContext } from 'react';
import './index.css';
import DemarcheSectionReadOnly from './DemarcheSectionReadOnly';
import DemarcheSectionSelect from './DemarcheSectionSelect';
import { FormContext } from '../../../templates/Form';

export const DemarcheSection = ({ title, body }) => {
  const { disabled } = useContext(FormContext);

  return (
    <>
      {disabled ? (
        <DemarcheSectionReadOnly title={title} />
      ) : (
        <DemarcheSectionSelect title={title} body={body} />
      )}
    </>
  );
};

export default DemarcheSection;
