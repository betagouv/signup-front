import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Scopes.css';
import WarningModal from './WarningModal';

const ModalContent = {
  rgpd: {
    title:
      'Assurez vous de ne pas demander une ou plusieurs données non utiles à vos traitements',
    body:
      'Afin de respecter le principe RGPD de minimisation de la circulation des ' +
      'données personnelles, nous effectuons un contrôle de cohérence entre les ' +
      'données demandées et l’usage décrit. Une demande non conforme fera ' +
      "l'objet d'un retour pour rectification, et donc d'un délai " +
      'supplémentaire.',
  },
  fc_incomplete: {
    title: "Cette donnée n'est pas vérifiée",
    body:
      "Elle ne ne sera transmise que si elle est disponible chez le fournisseur d'identité.",
  },
};

const Scopes = ({
  title,
  scopes,
  selectedScopes,
  disabledApplication,
  handleChange,
}) => {
  const [warningModalScope, setWarningModalScope] = useState(null);
  const [warningType, setWarningType] = useState('rgpd');

  const handleWarningModalClose = () => {
    handleChange({
      target: {
        type: 'checkbox',
        checked: true,
        name: `scopes.${warningModalScope}`,
      },
    });
    setWarningModalScope(null);
    setWarningType('rgpd');
  };

  return (
    <div className="form__group">
      <fieldset>
        {title && <label className="typography__caption label">{title}</label>}
        <div className="scope_container">
          {scopes.map(
            ({
              value,
              label,
              mandatory,
              comment,
              triggerWarning,
              warningType,
            }) => (
              <div className="scope_item" key={value}>
                <input
                  type="checkbox"
                  onChange={
                    triggerWarning && !selectedScopes[value]
                      ? () => {
                          setWarningType(warningType || 'rgpd');
                          setWarningModalScope(value);
                        }
                      : handleChange
                  }
                  name={`scopes.${value}`}
                  id={`checkbox-scope-${value}`}
                  disabled={disabledApplication || mandatory}
                  checked={selectedScopes[value]}
                />
                <label
                  htmlFor={`checkbox-scope-${value}`}
                  className="label-inline"
                >
                  {label}
                  {mandatory && <i> (nécessaire)</i>}
                </label>
                {comment && <div className="scope_comment">{comment}</div>}
              </div>
            )
          )}
        </div>
      </fieldset>
      {warningModalScope && (
        <WarningModal
          handleCancel={() => setWarningModalScope(null)}
          handleValidate={handleWarningModalClose}
          scopeLabel={
            scopes.find(({ value }) => value === warningModalScope).label
          }
          title={ModalContent[warningType].title}
          body={ModalContent[warningType].body}
        />
      )}
    </div>
  );
};

Scopes.defaultProps = {
  disabledApplication: false,
  title: null,
};

Scopes.propTypes = {
  title: PropTypes.string,
  scopes: PropTypes.array.isRequired,
  selectedScopes: PropTypes.object.isRequired,
  disabledApplication: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};

export default Scopes;
