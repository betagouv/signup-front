import React from 'react';

export const MultiSelect = ({
  options = [],
  values,
  disabled = false,
  onChange,
}) => {
  const handleChange = event => {
    // get multiple options from react select
    // see https://stackoverflow.com/questions/28624763/retrieving-value-from-select-with-multiple-option-in-react
    const values = Array.from(
      event.target.selectedOptions,
      option => option.value
    );
    onChange(values);
  };

  return (
    <select
      onChange={handleChange}
      value={values}
      multiple={true}
      style={{ height: '72px' }}
      disabled={disabled}
    >
      <option value="">Tous</option>
      {options.map(({ key, label }) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default MultiSelect;
