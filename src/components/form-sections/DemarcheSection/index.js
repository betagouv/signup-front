import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, merge } from 'lodash';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import './index.css';
import OpenInNewIcon from '../../icons/open-in-new';

export const DemarcheSection = ({ demarches }) => {
  const {
    onChange,
    enrollment: { id, demarche: selectedDemarcheId },
  } = useContext(FormContext);

  const [showInfo, setShowInfo] = useState(false);

  useEffect(
    () => setShowInfo(selectedDemarcheId && selectedDemarcheId !== 'default'),
    [selectedDemarcheId]
  );

  useEffect(() => {
    if (!id) {
      const current = demarches[selectedDemarcheId];
      const defaultDemarche = demarches.default || {};

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
          {Object.keys(demarches).map(id => (
            <option key={id} value={id}>
              {demarches[id].label}
            </option>
          ))}
        </select>
        {!isEmpty(demarches) && selectedDemarcheId && (
          <small className="card__meta">
            <i>
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Plus d’information sur le cas d'usage « ${selectedDemarcheId} »`}
                href={demarches[selectedDemarcheId].about}
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

DemarcheSection.propTypes = {
  demarches: PropTypes.object.isRequired,
};

export default DemarcheSection;
