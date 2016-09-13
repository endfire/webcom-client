import React, { PropTypes } from 'react';
import mapLabeltoFormLabel from '../mapLabeltoFormLabel';

const DynamicTextField = ({ field, handleChange }) => {
  const label = field.get('label');
  const isRequired = field.get('isRequired');
  const value = field.get('value');
  const placeholder = field.get('placeholder');
  const formLabel = mapLabeltoFormLabel(label);

  return (
    <fieldset>
      <label htmlFor={formLabel}>{label}</label>
      <input
        type="text"
        id={formLabel}
        name={formLabel}
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
