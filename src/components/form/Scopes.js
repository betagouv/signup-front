import React from 'react';
import PropTypes from 'prop-types';

const Scopes = ({
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
          {scopes.map(({ value, label, mandatory }) => (
            <div key={value}>
              <input
                type="checkbox"
                className="scope__checkbox"
                onChange={handleChange}
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
            </div>
          ))}
        </div>
      </div>
    </fieldset>
  </div>
);

Scopes.defaultProps = {
  disabledApplication: false,
};

Scopes.propTypes = {
  title: PropTypes.string.isRequired,
  scopes: PropTypes.array.isRequired,
  selectedScopes: PropTypes.object.isRequired,
  disabledApplication: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};

export default Scopes;
