import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import TextInput from './TextInput';

export const RadioInput = ({
  label,
  name,
  options = [],
  value = null,
  disabled,
  onChange,
}) => {
  // id will be set once when the component initially renders, but never again
  // we generate an unique id prefixed by the field name
  const [id] = useState(uniqueId(name));

  const isOtherSelected = !options.map(({ id: i }) => i).includes(value);

  return (
    <>
      <div className="form__group">
        <fieldset>
          <legend>{label}</legend>
          {options.map(({ id: optionId, label: optionLabel }) => (
            <div key={`${id}-${optionId}`}>
              <input
                type="radio"
                name={name}
                id={`${id}-${optionId}`}
                value={optionId}
                checked={value === optionId}
                onChange={onChange}
                disabled={disabled ? 'disabled' : false}
              />
              <label htmlFor={`${id}-${optionId}`} className="label-inline">
                {optionLabel}
              </label>
            </div>
          ))}
          <div key={`${id}-other`}>
            <input
              type="radio"
              name={name}
              id={`${id}-other`}
              value={''}
              checked={isOtherSelected}
              onChange={onChange}
              disabled={disabled ? 'disabled' : false}
            />
            <label htmlFor={`${id}-other`} className="label-inline">
              Autre
            </label>
          </div>
        </fieldset>
      </div>
      {isOtherSelected && (
        <TextInput
          label={'Précisez :'}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          ariaLabel={`Nom de votre ${label}`}
        />
      )}
    </>
  );
};

export default RadioInput;
