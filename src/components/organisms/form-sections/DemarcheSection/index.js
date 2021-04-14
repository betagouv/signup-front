import React, { useContext } from 'react';
import './index.css';
import DemarcheSectionReadOnly from './DemarcheSectionReadOnly';
import DemarcheSectionSelect from './DemarcheSectionSelect';
import { FormContext } from '../../../templates/Form';

export const DemarcheSection = () => {
  const { disabled } = useContext(FormContext);

  return (
    <>{disabled ? <DemarcheSectionReadOnly /> : <DemarcheSectionSelect />}</>
  );
};

export default DemarcheSection;
