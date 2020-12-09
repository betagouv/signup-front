import React, { useContext, useEffect, useState } from 'react';
import { get, isEmpty } from 'lodash';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import './index.css';
import { UserContext } from '../../UserContext';
import { findModifiedFields } from '../../../lib';

export const DemarcheSectionReadOnly = () => {
  const { enrollment, demarches } = useContext(FormContext);
  const { demarche: selectedDemarcheId } = enrollment;
  const {
    user: { roles },
  } = useContext(UserContext);

  const [modifiedFields, setModifiedFields] = useState([]);

  useEffect(() => {
    if (
      demarches[selectedDemarcheId] &&
      demarches[selectedDemarcheId].state &&
      enrollment
    ) {
      setModifiedFields(
        findModifiedFields(
          get(demarches, selectedDemarcheId, {}).state,
          enrollment
        )
      );
    }
  }, [enrollment, selectedDemarcheId, demarches]);

  return (
    <ScrollablePanel scrollableId="service-numerique">
      <h2>Service numérique</h2>
      <div>
        <p>
          Ce formulaire a été pré-rempli selon le cas d’usage suivant :{' '}
          <i>
            {get(demarches, selectedDemarcheId, {}).label || selectedDemarcheId}
          </i>
        </p>
        {!isEmpty(roles) && !isEmpty(modifiedFields) && (
          <p>
            Certaines des sections pré-remplies par le cas d’usage ont été
            modifiées.
          </p>
        )}
      </div>
    </ScrollablePanel>
  );
};

export default DemarcheSectionReadOnly;
