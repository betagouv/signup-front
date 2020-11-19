import React, { useContext, useEffect } from 'react';
import { isEmpty, merge } from 'lodash';
import { FormContext } from '../../Form';
import useDemarches from './useDemarchesApiGouv';
import { ScrollablePanel } from '../../Scrollable';
import './index.css';

export const DemarcheSection = () => {
  const {
    onChange,
    enrollment: { id, demarche: demarcheId, target_api },
  } = useContext(FormContext);

  const demarches = useDemarches(target_api);

  useEffect(() => {
    if (!id) {
      const current = demarches.find(({ id }) => id === demarcheId);
      const defaultDemarche =
        demarches.find(({ id }) => id === 'default') || {};

      if (!isEmpty(demarches) && current) {
        onChange(merge({}, defaultDemarche.state, current.state));
      }
    }
  }, [id, demarcheId, demarches, onChange]);

  const setDemarcheId = id => onChange({ demarche: id });

  if (id) return null;

  return (
    <ScrollablePanel scrollableId="demarche">
      <h2>Démarche</h2>
      <div className="form__group">
        <label htmlFor="fondement_juridique_url">
          Souhaitez vous sélectionner un cas d'usage ?
        </label>
      </div>
      {demarches.map(({ id, label }) => (
        <button
          key={id}
          className={`button-outline ${
            id === demarcheId ? 'primary' : 'secondary'
          }`}
          onClick={() => setDemarcheId(id)}
        >
          {label}
        </button>
      ))}
    </ScrollablePanel>
  );
};

export default DemarcheSection;
