import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Scopes.css';

const Scopes = ({
  title,
  scopes,
  selectedScopes,
  disabledApplication,
  handleChange,
}) => {
  const [warningModalScope, setWarningModalScope] = useState(null);

  const handleWarningModalClose = () => {
    handleChange({
      target: {
        type: 'checkbox',
        checked: true,
        name: `scopes.${warningModalScope}`,
      },
    });
    setWarningModalScope(null);
  };

  return (
    <div className="form__group">
      <fieldset>
        {title && <label className="typography__caption label">{title}</label>}
        <div className="scope_container">
          {scopes.map(
            ({ value, label, mandatory, comment, triggerWarning }) => (
              <div className="scope_item" key={value}>
                <input
                  type="checkbox"
                  onChange={
                    triggerWarning && !selectedScopes[value]
                      ? () => setWarningModalScope(value)
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
        <div
          className="modal__backdrop"
          id="modal"
          style={{ display: 'flex' }}
          onClick={() => setWarningModalScope(null)}
        >
          <div className="modal">
            <h3>
              Assurez vous de ne pas demander une ou plusieurs données non
              utiles à vos traitements
            </h3>
            <p>
              Afin de respecter le principe RGPD de minimisation de la
              circulation des données personnelles, nous effectuons un contrôle
              de cohérence entre les données demandées et l’usage décrit. Une
              demande non conforme fera l'objet d'un retour pour rectification,
              et donc d'un délai supplémentaire.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                className="button large warning"
                onClick={handleWarningModalClose}
              >
                Demander la donnée «{' '}
                {scopes.find(({ value }) => value === warningModalScope).label}{' '}
                »
              </button>
            </div>
          </div>
        </div>
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
