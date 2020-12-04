import React, { useState } from 'react';
import Helper from '../../Helper';
import { uniqueId } from 'lodash';

export const TextInput = ({
  label,
  helper,
  meta,
  name,
  placeholder = '',
  value = null,
  disabled,
  onChange,
}) => {
  const [id] = useState(uniqueId(name));

  return (
    <div className="form__group">
      <label htmlFor={id}>
        {label}
        {helper && <Helper title={helper} />}
      </label>
      <input
        type="text"
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        id={id}
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
};

export default TextInput;
