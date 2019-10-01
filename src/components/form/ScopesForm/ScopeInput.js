import React from 'react';
import PropTypes from 'prop-types';

const ScopeInput = ({
  name,
  humanName,
  mandatory,
  disabled,
  checked,
  handleChange,
}) => (
  <div>
    <input
      type="checkbox"
      className="scope__checkbox"
      onChange={handleChange}
      name={`scopes.${name}`}
      id={`checkbox-scope-${name}`}
      disabled={disabled || mandatory}
      checked={checked}
    />
    <label htmlFor={`checkbox-scope-${name}`} className="label-inline">
      {humanName}
      {mandatory && <i> (nécessaire)</i>}
    </label>
  </div>
);

ScopeInput.defaultProps = {
  mandatory: false,
  disabled: false,
  checked: false,
};

ScopeInput.propTypes = {
  name: PropTypes.string.isRequired,
  humanName: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};

export default ScopeInput;
