import React from 'react';
import PropTypes from 'prop-types';

import './Scopes.css';

const Scopes = ({
  title,
  scopes,
  selectedScopes,
  disabledApplication,
  handleChange,
}) => (
  <div className="form__group">
    <fieldset>
      <label>{title}</label>
      <div className="scope_container">
        {scopes.map(({ value, label, mandatory, comment }) => (
          <div className="scope_item" key={value}>
            <input
              type="checkbox"
              onChange={handleChange}
              name={`scopes.${value}`}
              id={`checkbox-scope-${value}`}
              disabled={disabledApplication || mandatory}
              checked={selectedScopes[value]}
            />
            <label htmlFor={`checkbox-scope-${value}`} className="label-inline">
              {label}
              {mandatory && <i> (nécessaire)</i>}
            </label>
            {comment && <div className="scope_comment">{comment}</div>}
          </div>
        ))}
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
