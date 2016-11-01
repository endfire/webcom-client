import React, { PropTypes } from 'react';

const DynamicTextField = ({ field, onChange }) => {
  const label = field.get('label');
  const isRequired = field.get('isRequired');
  const value = field.get('value');
  const placeholder = field.get('placeholder');
  const id = field.get('id');

  if (isRequired === 'false') {
    return (
      <fieldset>
        <label htmlFor={id}>{label}</label>
        <input
          type="text"
          id={id}
          name={id}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </fieldset>
    );
  }

  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required
      />
    </fieldset>
  );
};

DynamicTextField.propTypes = {
  field: PropTypes.object,
  onChange: PropTypes.func,
};

export default DynamicTextField;
