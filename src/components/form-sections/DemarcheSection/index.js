import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, merge } from 'lodash';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import './index.css';
import DemarcheSelectionNotification from './DemarcheSelectionNotification';

export const DemarcheSection = ({ demarches }) => {
  const {
    onChange,
    enrollment: { id: enrollmentId, demarche: selectedDemarcheId },
  } = useContext(FormContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 9000);
    return () => clearTimeout(timer);
  }, [selectedDemarcheId]);

  useEffect(() => {
    if (!enrollmentId) {
      const current = demarches[selectedDemarcheId];
      const defaultDemarche = demarches.default || {};

      if (!isEmpty(demarches) && current) {
        onChange(merge({}, defaultDemarche.state, current.state));
      }
    }
  }, [enrollmentId, selectedDemarcheId, demarches, onChange]);

  if (enrollmentId) return null;

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
          <label htmlFor="demarche">Sélectionnez-un cas d'usage :</label>
          <select
            id="demarche"
            name="demarche"
            value={selectedDemarcheId}
            onChange={onChange}
          >
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
