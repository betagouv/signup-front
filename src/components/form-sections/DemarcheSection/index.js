import React, { useContext, useEffect, useState } from 'react';
import { isEmpty, merge } from 'lodash';
import { FormContext } from '../../Form';
import useDemarches from './useDemarchesApiGouv';
import { ScrollablePanel } from '../../Scrollable';
import './index.css';
import OpenInNewIcon from '../../icons/open-in-new';

export const DemarcheSection = () => {
  const {
    onChange,
    enrollment: { id, demarche: selectedDemarcheId, target_api },
  } = useContext(FormContext);

  const [showInfo, setShowInfo] = useState(false);
  const demarches = useDemarches(target_api);

  useEffect(
    () => setShowInfo(selectedDemarcheId && selectedDemarcheId !== 'default'),
    [selectedDemarcheId]
  );

  useEffect(() => {
    if (!id) {
      const current = demarches.find(({ id }) => id === selectedDemarcheId);
      const defaultDemarche =
        demarches.find(({ id }) => id === 'default') || {};

      if (!isEmpty(demarches) && current) {
        onChange(merge({}, defaultDemarche.state, current.state));
      }
    }
  }, [id, selectedDemarcheId, demarches, onChange]);

  if (id) return null;

  return (
    <>
      <ScrollablePanel scrollableId="service-numerique">
        <h2>Service numérique</h2>
        <div className="form__group">
          <label htmlFor="demarche">
            Votre service correspond à un de ces cas ? Sélectionnez-le et gagnez
            du temps
          </label>
        </div>
        <select
          id="demarche"
          name="demarche"
          value={selectedDemarcheId}
          onChange={onChange}
        >
          {demarches.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
        {demarches && selectedDemarcheId && (
          <small className="card__meta">
            <i>
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Plus d’information sur le cas d'usage « ${selectedDemarcheId} »`}
                href={
                  demarches.find(({ id }) => id === selectedDemarcheId).about
                }
              >
                Consulter le détail de ce cas d'usage{' '}
                <OpenInNewIcon color={'var(--theme-primary)'} size={14} />
              </a>
            </i>
          </small>
        )}
      </ScrollablePanel>
      {showInfo && (
        <div className="notification info">
          Certains champs ont été pré-rempli en fonction de votre choix pour
          faciliter votre demande. Vous pouvez toujours les modifier.
        </div>
      )}
    </>
  );
};

export default DemarcheSection;
