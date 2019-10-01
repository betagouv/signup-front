import React from 'react';
import PropTypes from 'prop-types';

import ScopeInput from './ScopeInput';

const ScopesForm = ({
  title,
  scopes,
  selectedScopes,
  disabledApplication,
  handleChange,
}) => (
  <div className="form__group">
    <fieldset className="vertical">
      <label>{title}</label>
      <div className="row">
        <div className="column">
          {scopes.map(({ name, humanName, mandatory }) => (
            <ScopeInput
              key={name}
              name={name}
              humanName={humanName}
              mandatory={mandatory}
              disabled={disabledApplication}
              checked={selectedScopes[name]}
              handleChange={handleChange}
            />
          ))}
        </div>
      </div>
    </fieldset>
  </div>
);

ScopesForm.defaultProps = {
  disabledApplication: false,
};

ScopesForm.propTypes = {
  title: PropTypes.string.isRequired,
  scopes: PropTypes.array.isRequired,
  selectedScopes: PropTypes.object.isRequired,
  disabledApplication: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};

export default ScopesForm;
