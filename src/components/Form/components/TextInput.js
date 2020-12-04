import React from 'react';
import Helper from '../../Helper';

export const TextInput = ({
  label,
  helper,
  meta,
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
    <input
      type="text"
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      id={name}
      readOnly={disabled}
      value={value}
    />
    {meta && (
      <small className="card__meta">
        <i>{meta}</i>
      </small>
    )}
  </div>
);

export default TextInput;
