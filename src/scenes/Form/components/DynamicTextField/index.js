import React, { PropTypes } from 'react';

const DynamicTextField = ({ field, handleChange }) => {
  const label = field.get('label');
  const isRequired = field.get('isRequired');
  const value = field.get('value');
  const placeholder = field.get('placeholder');
  const id = field.get('id');

  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        required={isRequired}
      />
    </fieldset>
  );
};

DynamicTextField.propTypes = {
  field: PropTypes.object,
  handleChange: PropTypes.func,
};

export default DynamicTextField;
