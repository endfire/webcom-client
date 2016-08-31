import React, { PropTypes } from 'react';
import { Button } from 'paintcan';
import { withForm } from 'components';
import * as names from 'constants/formNames';
import * as templates from 'data/templates';
import styles from './styles.scss'

const options = Object.keys(templates)
  .map(template => ([templates[template].id, templates[template].name]))
  .concat([['', 'Select a form template']])
  .reverse();

const FieldInitializerForm = ({ handleChange, handleSubmit, isSubmitting }) => (
  <div className={styles.initializer}>
    {isSubmitting && (
      <div className={styles.initializerOverlay}>
        Initializing!
      </div>
    )}
    <div className={styles.initializerInfo}>
      <h3>This form hasn't been initialized yet</h3>
      <p>Choose a template to the right to begin</p>
    </div>
    <div className={styles.initializerForm}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="template">Template</label>
          <select name="template" onChange={(e) => handleChange('template', e.target.value)}>
            {options.map(([value, label]) =>
              <option key={value} value={value}>{label}</option>
            )}
          </select>
        </fieldset>
        <fieldset>
          <Button type="submit" color="primary" block loading={isSubmitting}>
            Initialize
          </Button>
        </fieldset>
      </form>
    </div>
  </div>
);

FieldInitializerForm.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

export default (form) => withForm({
  form: names.FIELD_INITIALIZER,
  initialValues: {
    id: form.get('id'),
    template: '',
  },
  validation: {
    template: (value) => !!value.length,
  },
})(FieldInitializerForm);
