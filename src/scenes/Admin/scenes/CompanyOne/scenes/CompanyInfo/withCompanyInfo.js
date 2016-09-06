import React, { PropTypes } from 'react';
import { Button, ButtonGroup } from 'paintcan';
import { withForm } from 'components';
import * as names from 'constants/formNames';
import isNull from 'validator/lib/isNull';

const CompanyInfoForm = ({
  handleSubmit,
  handleChange,
  isSubmitting,
  revert,
  values,
}) => (
  <form onSubmit={handleSubmit}>
    <fieldset>
      <label htmlFor="name">Name of Company</label><br />
      <input
        id="name"
        type="text"
        placeholder="Company, Inc."
        value={values ? values.getIn(['name', 'value']) : ''}
        onChange={(e) => handleChange('name', e.target.value)}
      /><br />
      <label htmlFor="street">Street</label><br />
      <input
        id="street"
        type="text"
        placeholder="123 Maple Street"
        value={values ? values.getIn(['street', 'value']) : ''}
        onChange={(e) => handleChange('street', e.target.value)}
      /><br />
      <label htmlFor="city">City</label><br />
      <input
        id="city"
        type="text"
        placeholder="Anytown"
        value={values ? values.getIn(['city', 'value']) : ''}
        onChange={(e) => handleChange('city', e.target.value)}
      /><br />
      <label htmlFor="state">State</label><br />
      <input
        id="state"
        type="state"
        placeholder="Colorado"
        value={values ? values.getIn(['state', 'value']) : ''}
        onChange={(e) => handleChange('state', e.target.value)}
      /><br />
      <label htmlFor="zip">Zip Code</label><br />
      <input
        id="zip"
        type="text"
        placeholder="80123"
        value={values ? values.getIn(['zip', 'value']) : ''}
        onChange={(e) => handleChange('zip', e.target.value)}
      /><br />
      <label htmlFor="phone">Phone Number</label><br />
      <input
        id="phone"
        type="text"
        placeholder="123-456-7890"
        value={values ? values.getIn(['phone', 'value']) : ''}
        onChange={(e) => handleChange('phone', e.target.value)}
      /><br />
      <label htmlFor="url">Company URL</label><br />
      <input
        id="url"
        type="text"
        placeholder="http://companyname.com"
        value={values ? values.getIn(['url', 'value']) : ''}
        onChange={(e) => handleChange('url', e.target.value)}
      /><br />
      <label htmlFor="email">Email</label><br />
      <input
        id="email"
        type="text"
        placeholder="company@domain.com"
        value={values ? values.getIn(['email', 'value']) : ''}
        onChange={(e) => handleChange('email', e.target.value)}
      /><br />
      <label htmlFor="description">Description</label><br />
      <input
        id="description"
        type="text"
        placeholder="Description of company"
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

CompanyInfoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  revert: PropTypes.func.isRequired,
  values: PropTypes.object,
};

export default (company) => withForm({
  form: names.COMPANY_INFO,
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
})(CompanyInfoForm);
