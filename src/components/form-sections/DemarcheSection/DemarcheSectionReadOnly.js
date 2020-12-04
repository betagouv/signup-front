import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import './index.css';
import { UserContext } from '../../UserContext';
import { findModifiedFields } from '../../../lib';

export const DemarcheSectionReadOnly = ({ demarches }) => {
  const { enrollment } = useContext(FormContext);
  const { demarche: selectedDemarcheId } = enrollment;
  const {
    user: { roles },
  } = useContext(UserContext);

  const [modifiedFields, setModifiedFields] = useState(false);

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
            {(demarches[selectedDemarcheId] || {}).label || selectedDemarcheId}
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

DemarcheSectionReadOnly.propTypes = {
  demarches: PropTypes.object.isRequired,
};

export default DemarcheSectionReadOnly;
