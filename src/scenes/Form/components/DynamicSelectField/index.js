import React, { PropTypes } from 'react';

const DynamicSelectField = ({ field, onChange }) => {
  const label = field.get('label');
  const isRequired = field.get('isRequired');
  const value = field.get('value');
  const options = field.get('options');
  const id = field.get('id');

  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={id}
        onChange={onChange}
        value={value}
        required={isRequired}
      >
        {options.toArray().map(option => (
          <option key={option} value={option}>
            {option}
          </option>)
        )}
      </select>
    </fieldset>
  );
};

DynamicSelectField.propTypes = {
  field: PropTypes.object,
  onChange: PropTypes.func,
};

export default DynamicSelectField;
