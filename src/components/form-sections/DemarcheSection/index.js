import React, { useContext } from 'react';
import { FormContext } from '../../Form';
import useDemarches from './useDemarchesApiGouv';
import { ScrollablePanel } from '../../Scrollable';
import './index.css';

export const DemarcheSection = () => {
  const {
    enrollment: { id, demarche, target_api },
  } = useContext(FormContext);

  const demarches = useDemarches(target_api);

  const currentDemarche = demarches.find(({ id }) => id === demarche);

  if (id) return null;

  return (
    <ScrollablePanel scrollableId="demarche">
      <h2>Démarche</h2>
      <div className="form__group">
        {!demarche ? (
          <label htmlFor="fondement_juridique_url">
            Quel est votre cas d'usage ?
          </label>
        ) : (
          <>
            <div className="form__group">
              Vous avez sélectionné le cas d'usage suivant :{' '}
            </div>
            <div className="form__group">
              <i>{currentDemarche ? currentDemarche.label : 'chargement...'}</i>
            </div>
            <div className="form__group">
              <label htmlFor="fondement_juridique_url">
                Souhaitez vous sélectionner un autre cas d'usage ?
              </label>
            </div>
          </>
        )}
        {demarches.map(({ id, label, path }) => (
          <a
            key={id}
            className={`button-outline ${
              id === demarche ? 'primary' : 'secondary'
            }`}
            href={path}
          >
            {label}
          </a>
        ))}
      </div>
    </ScrollablePanel>
  );
};

export default DemarcheSection;
