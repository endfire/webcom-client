import React, { PropTypes } from 'react';

const DynamicCheckboxField = ({ field, onChange }) => {
  const label = field.get('label');
  const options = field.get('options');
  const id = field.get('id');

  return (
    <fieldset>
      <label >{label}</label>
      {options.map(option => (
        <div key={option}>
          <input
            type="checkbox"
            id={option}
            name={id}
            onChange={onChange}
            value={option}
          />
          <label htmlFor={option}>
            {option}
          </label>
        </div>)
      )}
    </fieldset>
  );
};

DynamicCheckboxField.propTypes = {
  field: PropTypes.object,
  onChange: PropTypes.func,
};

export default DynamicCheckboxField;
