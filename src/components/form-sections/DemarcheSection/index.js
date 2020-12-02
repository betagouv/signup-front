import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, merge } from 'lodash';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import './index.css';
import { UserContext } from '../../UserContext';

const findModifiedFields = (demarcheState, enrollmentState) => {
  const modified = [];
  Object.keys(demarcheState).forEach(key => {
    const initialValue = demarcheState[key];
    const value = enrollmentState[key];
    if (JSON.stringify(initialValue) !== JSON.stringify(value)) {
      modified.push(key);
    }
  });
  return modified;
};

export const DemarcheSection = ({ demarches }) => {
  const { onChange, enrollment, disabled } = useContext(FormContext);
  const { id: enrollmentId, demarche: selectedDemarcheId } = enrollment;
  const { user: role } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [modifiedFields, setModifiedFields] = useState([]);

  const selectNewDemarche = e => {
    if (modifiedFields.length > -1) {
      if (window.confirm('Attention vous allez écraser vos changements')) {
        onChange(e);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, [selectedDemarcheId]);

  useEffect(() => {
    if (
      demarches[selectedDemarcheId] &&
      demarches[selectedDemarcheId].state &&
      enrollment
    ) {
      setModifiedFields(
        findModifiedFields(demarches[selectedDemarcheId].state, enrollment)
      );
    }
  }, [enrollment, selectedDemarcheId, demarches]);

  useEffect(() => {
    if (!enrollmentId) {
      const current = demarches[selectedDemarcheId];
      const defaultDemarche = demarches.default || {};

      if (!isEmpty(demarches) && current) {
        onChange(merge({}, defaultDemarche.state, current.state));
      }
    }
  }, [enrollmentId, selectedDemarcheId, demarches, onChange]);

  if (enrollmentId && disabled) {
    return (
      <ScrollablePanel scrollableId="service-numerique">
        <h2>Service numérique</h2>
        <div>
          <p>
            Ce formulaire a été pré-rempli selon le cas d’usage suivant :{' '}
            <i>{demarches[selectedDemarcheId].label || selectedDemarcheId}</i>
          </p>
          {isEmpty(role) && modifiedFields.length > 0 && (
            <p>
              Certaines des sections pré-remplies par le cas d’usage ont été
              modifiées.
            </p>
          )}
        </div>
      </ScrollablePanel>
    );
  }

  return (
    <>
      <ScrollablePanel scrollableId="service-numerique">
        <h2>Service numérique</h2>
        <p>
          Nous avons identifié plusieurs cas d’usage de cette API. Si votre
          demande s’inscrit dans un des cas ci-dessous, selectionnez-le pour
          gagner du temps.
        </p>
        <div>
          <select
            id="demarche"
            name="demarche"
            value={selectedDemarcheId}
            onChange={selectNewDemarche}
          >
            <option value={null}>-- Selectionnez votre cas d’usage --</option>
            {Object.keys(demarches).map(demarcheId => (
              <option key={demarcheId} value={demarcheId}>
                {demarches[demarcheId].label}
              </option>
            ))}
          </select>
        </div>
      </ScrollablePanel>
      <DemarcheSelectionNotification
        isLoading={isLoading}
        selectedDemarcheId={selectedDemarcheId}
        demarches={demarches}
      />
    </>
  );
};

DemarcheSection.propTypes = {
  demarches: PropTypes.object.isRequired,
};

export default DemarcheSection;
