import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, merge } from 'lodash';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import './index.css';
import ConfirmationModal from '../../ConfirmationModal';
import { findModifiedFields } from '../../../lib';
import DemarcheSectionSelectNotification from './DemarcheSectionSelectNotification';

export const DemarcheSectionSelect = ({ demarches }) => {
  const { onChange, enrollment } = useContext(FormContext);
  const { demarche: selectedDemarcheId } = enrollment;

  const [isLoading, setIsLoading] = useState(false);
  const [confirmNewDemarcheId, setConfirmNewDemarcheId] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, [selectedDemarcheId]);

  useEffect(() => {
    const current = demarches[selectedDemarcheId];

    if (!isEmpty(demarches) && current) {
      // update Enrollment Context with pre-filled state
      onChange(merge({}, demarches.get('default', {}).state, current.state));
    }
  }, [selectedDemarcheId, demarches, onChange]);

  const onSelectDemarche = event => {
    let newDemarcheId = event.target.value || 'default';

    const modifs = findModifiedFields(
      merge(
        {},
        demarches.get('default', {}).state,
        demarches.get(selectedDemarcheId, {}).state
      ),
      enrollment
    );
    if (!isEmpty(modifs)) {
      // trigger confirmation modal before updating Enrollment
      setConfirmNewDemarcheId(newDemarcheId);
    } else {
      // update Enrollment Context with new demarche
      onChange({ demarche: newDemarcheId });
    }
  };

  return (
    <>
      <ScrollablePanel scrollableId="service-numerique">
        {confirmNewDemarcheId && (
          <ConfirmationModal
            title="Attention, vous allez écraser certains de vos changements"
            handleCancel={() => setConfirmNewDemarcheId(false)}
            handleConfirm={() => {
              setConfirmNewDemarcheId(false);
              onChange({ demarche: confirmNewDemarcheId });
            }}
            okLabel="Changer tout de même"
          >
            <p>
              En changeant de cas d’usage, certains des champs que vous avez
              édité vont être écrasés.
            </p>
          </ConfirmationModal>
        )}
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
            onChange={onSelectDemarche}
          >
            {Object.keys(demarches).map(demarcheId => (
              <option key={demarcheId} value={demarcheId}>
                {demarches.get(demarcheId, {}).label}
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

DemarcheSectionSelect.propTypes = {
  demarches: PropTypes.object.isRequired,
};

export default DemarcheSectionSelect;
