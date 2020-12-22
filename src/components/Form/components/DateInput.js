import React, { useState } from 'react';
import { uniqueId } from 'lodash';

export const DateInput = ({
  label,
  name,
  value = null,
  disabled,
  onChange,
}) => {
  // id will be set once when the component initially renders, but never again
  // we generate an unique id prefixed by the field name
  const [id] = useState(uniqueId(name));

  return (
    <div className="form__group">
      <label htmlFor={id}>{label}</label>
      <input
        type="date"
        onChange={onChange}
        name={name}
        id={id}
        readOnly={disabled}
        value={value}
      />
    </div>
  );
};

export default DateInput;
