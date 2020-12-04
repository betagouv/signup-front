import React from 'react';

export const CheckboxInput = ({
  label,
  name,
  value = null,
  disabled,
  onChange,
}) => (
  <div className="form__group">
    <input
      onChange={onChange}
      disabled={disabled ? 'disabled' : false}
      checked={value}
      type="checkbox"
      name={name}
      id={name}
    />
    <label htmlFor={name} className="label-inline">
      {label}
    </label>
  </div>
);

export default CheckboxInput;
