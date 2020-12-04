import React from 'react';

export const NumberInput = ({
  label,
  name,
  value = null,
  disabled,
  onChange,
}) => (
  <div className="form__group">
    <label htmlFor={name}>{label}</label>
    <input
      type="number"
      min="0"
      max="2147483647"
      onChange={onChange}
      name={name}
      id={name}
      disabled={disabled}
      value={value}
    />
  </div>
);

export default NumberInput;
