import React, { PropTypes } from 'react';
import mapLabeltoFormLabel from '../mapLabeltoFormLabel';

const DynamicCheckboxField = ({ field, handleChange }) => {
  const label = field.get('label');
  const options = field.get('options');
  const formLabel = mapLabeltoFormLabel(label);
  const keys = options.keySeq();

  return (
    <fieldset>
      <label >{label}</label>
      {keys.map(key => (
        <div>
          <input
            type="checkbox"
            id={options.getIn([key, 'value'])}
            name={formLabel}
            onChange={handleChange}
            value={options.getIn([key, 'value'])}
          />
          <label htmlFor={options.getIn([key, 'value'])}>
            {options.getIn([key, 'text'])}
          </label>
        </div>)
      )}
    </fieldset>
  );
};

DynamicCheckboxField.propTypes = {
  field: PropTypes.object,
  handleChange: PropTypes.func,
};

export default DynamicCheckboxField;
