import React, { PropTypes } from 'react';
import styles from './styles.scss';

const DynamicTextareaField = ({ field, onChange }) => {
  const label = field.get('label');
  const isRequired = field.get('isRequired');
  const value = field.get('value');
  const placeholder = field.get('placeholder');
  const id = field.get('id');

  if (isRequired === 'false') {
    return (
      <fieldset>
        <label htmlFor={id}>{label}</label>
        <div>
          <textarea
            id={id}
            name={id}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className={styles.textarea}
          />
        </div>
      </fieldset>
    );
  }

  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <div>
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required
          className={styles.textarea}
        />
      </div>
    </fieldset>
  );
};

DynamicTextareaField.propTypes = {
  field: PropTypes.object,
  onChange: PropTypes.func,
};

export default DynamicTextareaField;
