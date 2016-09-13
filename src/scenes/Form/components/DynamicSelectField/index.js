import React, { PropTypes } from 'react';
import mapLabeltoFormLabel from '../mapLabeltoFormLabel';

const DynamicSelectField = ({ field, handleChange }) => {
  const label = field.get('label');
  const isRequired = field.get('isRequired');
  const value = field.get('value');
  const options = field.get('options');
  const formLabel = mapLabeltoFormLabel(label);
  const keys = options.keySeq();

  return (
    <fieldset>
      <label htmlFor={formLabel}>{label}</label>
      <select
        id={formLabel}
        name={formLabel}
        onChange={handleChange}
        value={value}
        required={isRequired}
      >
        {keys.map(key => (
          <option value={options.getIn([key, 'value'])}>
            {options.getIn([key, 'text'])}
          </option>)
        )}
      </select>
    </fieldset>
  );
};

DynamicSelectField.propTypes = {
  field: PropTypes.object,
  handleChange: PropTypes.func,
};

export default DynamicSelectField;
