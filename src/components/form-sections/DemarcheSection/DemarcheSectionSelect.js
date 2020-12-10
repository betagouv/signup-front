import React, { useCallback, useContext, useEffect, useState } from 'react';
import { isEmpty, merge, get } from 'lodash';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import './index.css';
import ConfirmationModal from '../../ConfirmationModal';
import { findModifiedFields } from '../../../lib';
import DemarcheSectionSelectNotification from './DemarcheSectionSelectNotification';

export const DemarcheSectionSelect = () => {
  const { onChange, enrollment, demarches } = useContext(FormContext);
  const { demarche: selectedDemarcheId } = enrollment;

  const [isLoading, setIsLoading] = useState(false);
  const [confirmNewDemarcheId, setConfirmNewDemarcheId] = useState(false);

  // reducer expects onChange events from HTML Element
  const selectNewDemarche = useCallback(
    newDemarcheId => {
      onChange({ target: { value: newDemarcheId, name: 'demarche' } });
    },
    [onChange]
  );

  const onSelectDemarche = event => {
    let newDemarcheId = event.target.value || 'default';

    const preFilledEnrollment = merge(
      {},
      get(demarches, 'default', {}).state,
      get(demarches, selectedDemarcheId, {}).state
    );

    // we compare current enrollment with prefilled associated with selectedDemarcheId
    // if modifications, it means any change to selectedDemarcheId could overwrite the user's changes.
    const modifications = findModifiedFields(preFilledEnrollment, enrollment);

    if (!isEmpty(modifications)) {
      // trigger confirmation modal before updating Enrollment
      setConfirmNewDemarcheId(newDemarcheId);
    } else {
      // update Enrollment Context with new demarche
      selectNewDemarche(newDemarcheId);
    }
  };

  useEffect(() => {
    // Initialize demarche in Enrollment
    if (!selectedDemarcheId) {
      selectNewDemarche('default');
    }
  }, [selectedDemarcheId, selectNewDemarche]);

  useEffect(() => {
    if (selectedDemarcheId !== 'default') {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 900);
      return () => clearTimeout(timer);
    }
  }, [selectedDemarcheId]);

  return (
    <>
      <ScrollablePanel scrollableId="modeles-preremplis">
        {confirmNewDemarcheId && (
          <ConfirmationModal
            title="Attention, vous allez écraser certains de vos changements"
            handleCancel={() => setConfirmNewDemarcheId(false)}
            handleConfirm={() => {
              setConfirmNewDemarcheId(false);
              selectNewDemarche(confirmNewDemarcheId);
            }}
            confirmLabel="Changer tout de même"
          >
            <p>
              En changeant de cas d’usage, certains des champs que vous avez
              édité vont être écrasés.
            </p>
          </ConfirmationModal>
        )}
        <h2>Modèles pré-remplis</h2>
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
            onChange={onSelectDemarche}
          >
            {Object.keys(demarches).map(demarcheId => (
              <option key={demarcheId} value={demarcheId}>
                {get(demarches, demarcheId, {}).label}
              </option>
            ))}
          </select>
        </div>
      </ScrollablePanel>
      <DemarcheSectionSelectNotification
        isLoading={isLoading}
        selectedDemarcheId={selectedDemarcheId}
        demarches={demarches}
      />
    </>
  );
};

export default DemarcheSectionSelect;
