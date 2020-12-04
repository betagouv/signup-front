import React from 'react';
import Helper from '../../Helper';

export const TextAreaInput = ({
  label,
  helper,
  name,
  placeholder = '',
  value = null,
  disabled,
  onChange,
}) => (
  <div className="form__group">
    <label htmlFor={name}>
      {label}
      {helper && <Helper title={helper} />}
    </label>
    <textarea
      rows="10"
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      id={name}
      readOnly={disabled}
      value={value}
    />
  </div>
);

export default TextAreaInput;
