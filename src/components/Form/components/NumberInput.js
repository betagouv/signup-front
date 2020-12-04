import React, { useState } from 'react';
import { uniqueId } from 'lodash';

export const NumberInput = ({
  label,
  name,
  value = null,
  disabled,
  onChange,
}) => {
  const [id] = useState(uniqueId(name));

  return (
    <div className="form__group">
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        min="0"
        max="2147483647"
        onChange={onChange}
        name={name}
        id={id}
        disabled={disabled}
        value={value}
      />
    </div>
  );
};

export default NumberInput;
