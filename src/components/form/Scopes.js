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
          {scopes.map(({ name, humanName, mandatory }) => (
            <div key={name}>
              <input
                type="checkbox"
                className="scope__checkbox"
                onChange={handleChange}
                name={`scopes.${name}`}
                id={`checkbox-scope-${name}`}
                disabled={disabledApplication || mandatory}
                checked={selectedScopes[name]}
              />
              <label
                htmlFor={`checkbox-scope-${name}`}
                className="label-inline"
              >
                {humanName}
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
