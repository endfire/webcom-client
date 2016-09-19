/* eslint-disable max-len */
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
      <label htmlFor="name">Name of company</label><br />
      <input
        id="name"
        type="text"
        placeholder="Company, Inc."
        value={values ? values.getIn(['name', 'value']) : ''}
        onChange={(e) => handleChange('name', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="street">Street</label><br />
      <input
        id="street"
        type="text"
        placeholder="123 Maple Street"
        value={values ? values.getIn(['street', 'value']) : ''}
        onChange={(e) => handleChange('street', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="city">City</label><br />
      <input
        id="city"
        type="text"
        placeholder="Denver"
        value={values ? values.getIn(['city', 'value']) : ''}
        onChange={(e) => handleChange('city', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="state">State</label><br />
      <input
        id="state"
        type="state"
        placeholder="Colorado"
        value={values ? values.getIn(['state', 'value']) : ''}
        onChange={(e) => handleChange('state', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="zip">Zip Code</label><br />
      <input
        id="zip"
        type="text"
        placeholder="80123"
        value={values ? values.getIn(['zip', 'value']) : ''}
        onChange={(e) => handleChange('zip', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="country">Country</label><br />
      <input
        id="country"
        type="text"
        placeholder="USA"
        value={values ? values.getIn(['country', 'value']) : ''}
        onChange={(e) => handleChange('country', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="phone">Phone Number</label><br />
      <input
        id="phone"
        type="text"
        placeholder="123-456-7890"
        value={values ? values.getIn(['phone', 'value']) : ''}
        onChange={(e) => handleChange('phone', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="fax">Fax</label><br />
      <input
        id="fax"
        type="text"
        placeholder="123-456-7890"
        value={values ? values.getIn(['fax', 'value']) : ''}
        onChange={(e) => handleChange('fax', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="url">URL</label><br />
      <input
        id="url"
        type="text"
        placeholder="https://company.com"
        value={values ? values.getIn(['url', 'value']) : ''}
        onChange={(e) => handleChange('url', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="email">Email</label><br />
      <input
        id="email"
        type="text"
        placeholder="company@domain.com"
        value={values ? values.getIn(['email', 'value']) : ''}
        onChange={(e) => handleChange('email', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="description">Description</label><br />
      <input
        id="description"
        type="text"
        placeholder="We provide XYZ to customers all over the US"
        value={values ? values.getIn(['description', 'value']) : ''}
        onChange={(e) => handleChange('description', e.target.value)}
      />
    </fieldset>
    <input id="oldName" value={values ? values.getIn(['oldName', 'value']) : ''} type="text" hidden />
    <input id="oldStreet" value={values ? values.getIn(['oldStreet', 'value']) : ''} type="text" hidden />
    <input id="oldCity" value={values ? values.getIn(['oldCity', 'value']) : ''} type="text" hidden />
    <input id="oldState" value={values ? values.getIn(['oldState', 'value']) : ''} type="text" hidden />
    <input id="oldZip" value={values ? values.getIn(['oldZip', 'value']) : ''} type="text" hidden />
    <input id="oldCountry" value={values ? values.getIn(['oldCountry', 'value']) : ''} type="text" hidden />
    <input id="oldPhone" value={values ? values.getIn(['oldPhone', 'value']) : ''} type="text" hidden />
    <input id="oldFax" value={values ? values.getIn(['oldFax', 'value']) : ''} type="text" hidden />
    <input id="oldUrl" value={values ? values.getIn(['oldUrl', 'value']) : ''} type="text" hidden />
    <input id="oldEmail" value={values ? values.getIn(['oldEmail', 'value']) : ''} type="text" hidden />
    <input id="oldDescription" value={values ? values.getIn(['oldDescription', 'value']) : ''} type="text" hidden />
    <fieldset>
      <ButtonGroup spaced>
        <Button type="submit" color="primary" loading={isSubmitting}>
          Submit
        </Button>
        <Button type="button" color="danger" onClick={revert}>
          Cancel
        </Button>
      </ButtonGroup>
    </fieldset>
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
    country: company.get('country') || '',
    phone: company.get('phone') || '',
    fax: company.get('fax') || '',
    url: company.get('url') || '',
    email: company.get('email') || '',
    description: company.get('description') || '',
    oldName: company.get('name') || '',
    oldStreet: company.get('street') || '',
    oldCity: company.get('city') || '',
    oldState: company.get('state') || '',
    oldZip: company.get('zip') || '',
    oldCountry: company.get('country') || '',
    oldPhone: company.get('phone') || '',
    oldFax: company.get('fax') || '',
    oldUrl: company.get('url') || '',
    oldEmail: company.get('email') || '',
    oldDescription: company.get('description') || '',
  },
  validation: {
    name: (value) => !isNull(value),
    email: (value) => !isNull(value),
    description: (value) => !isNull(value),
  },
})(CompanySettingsForm);
