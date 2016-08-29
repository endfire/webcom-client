import React, { PropTypes } from 'react';
import { Button, ButtonGroup } from 'paintcan';
import { withForm } from 'components';
import * as names from 'constants/formNames';
import isNull from 'validator/lib/isNull';

const CompanySettingsForm = ({
  handleSubmit,
  handleChange,
  isSubmitting,
  revert,
  values,
}) => (
  <form onSubmit={handleSubmit}>
    <fieldset>
      <label htmlFor="name">Name of company</label>
      <input
        id="name"
        type="text"
        placeholder="Company, Inc."
        value={values ? values.getIn(['name', 'value']) : ''}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <label htmlFor="street">Street</label>
      <input
        id="street"
        type="text"
        placeholder="123 Maple Street"
        value={values ? values.getIn(['street', 'value']) : ''}
        onChange={(e) => handleChange('street', e.target.value)}
      />
      <label htmlFor="city">City</label>
      <input
        id="city"
        type="text"
        placeholder="Denver"
        value={values ? values.getIn(['city', 'value']) : ''}
        onChange={(e) => handleChange('city', e.target.value)}
      />
      <label htmlFor="state">State</label>
      <input
        id="state"
        type="state"
        placeholder="Colorado"
        value={values ? values.getIn(['state', 'value']) : ''}
        onChange={(e) => handleChange('state', e.target.value)}
      />
      <label htmlFor="zip">Zip Code</label>
      <input
        id="zip"
        type="text"
        placeholder="80123"
        value={values ? values.getIn(['zip', 'value']) : ''}
        onChange={(e) => handleChange('zip', e.target.value)}
      />
      <label htmlFor="phone">Phone Number</label>
      <input
        id="phone"
        type="text"
        placeholder="123-456-7890"
        value={values ? values.getIn(['phone', 'value']) : ''}
        onChange={(e) => handleChange('phone', e.target.value)}
      />
      <label htmlFor="url">URL</label>
      <input
        id="url"
        type="text"
        placeholder="https://company.com"
        value={values ? values.getIn(['url', 'value']) : ''}
        onChange={(e) => handleChange('url', e.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        placeholder="company@domain.com"
        value={values ? values.getIn(['email', 'value']) : ''}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <label htmlFor="description">Description</label>
      <input
        id="description"
        type="text"
        placeholder="We provide XYZ to customers all over the US"
        value={values ? values.getIn(['description', 'value']) : ''}
        onChange={(e) => handleChange('description', e.target.value)}
      />
    </fieldset>
    <ButtonGroup spaced>
      <Button type="submit" color="primary" loading={isSubmitting}>
        Submit
      </Button>
      <Button type="button" color="danger" onClick={revert}>
        Cancel
      </Button>
    </ButtonGroup>
  </form>
);

CompanySettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  revert: PropTypes.func.isRequired,
  values: PropTypes.object,
};

export default (company) => withForm({
  form: names.COMPANY_SETTINGS,
  recordID: company.get('id'),
  initialValues: {
    name: company.get('name') || '',
    street: company.get('street') || '',
    city: company.get('city') || '',
    state: company.get('state') || '',
    zip: company.get('zip') || '',
    phone: company.get('phone') || '',
    url: company.get('url') || '',
    email: company.get('email') || '',
    description: company.get('description') || '',
  },
  validation: {
    name: (value) => !isNull(value),
    street: (value) => !isNull(value),
    city: (value) => !isNull(value),
    state: (value) => !isNull(value),
    zip: (value) => !isNull(value),
    phone: (value) => !isNull(value),
    url: (value) => !isNull(value),
    email: (value) => !isNull(value),
    description: (value) => !isNull(value),
  },
})(CompanySettingsForm);
