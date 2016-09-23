import React, { PropTypes } from 'react';
import { Button, ButtonGroup } from 'paintcan';
import { withForm } from 'components';
import * as names from 'constants/formNames';
import isNull from 'validator/lib/isNull';
import styles from './settings.scss';

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
      <label htmlFor="streetTwo">Street 2</label><br />
      <input
        id="streetTwo"
        type="text"
        placeholder="Suite 200"
        value={values ? values.getIn(['streetTwo', 'value']) : ''}
        onChange={(e) => handleChange('streetTwo', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="city">City</label><br />
      <input
        id="city"
        type="text"
        placeholder="Anytown"
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
      <label htmlFor="url">Company URL</label><br />
      <input
        id="url"
        type="text"
        placeholder="http://companyname.com"
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
      <textarea
        className={styles.textarea}
        id="description"
        type="text"
        placeholder="Description of company"
        value={values ? values.getIn(['description', 'value']) : ''}
        onChange={(e) => handleChange('description', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="lastContacted">Last Contacted</label><br />
      <input
        id="lastContacted"
        type="text"
        placeholder="Last contacted."
        value={values ? values.getIn(['lastContacted', 'value']) : ''}
        onChange={(e) => handleChange('lastContacted', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="lastUpdated">Last Updated</label><br />
      <input
        id="lastUpdated"
        type="text"
        placeholder="Last updated."
        value={values ? values.getIn(['lastUpdated', 'value']) : ''}
        onChange={(e) => handleChange('lastUpdated', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="yearEstablished">Year Established</label><br />
      <input
        id="yearEstablished"
        type="text"
        placeholder="Year established."
        value={values ? values.getIn(['yearEstablished', 'value']) : ''}
        onChange={(e) => handleChange('yearEstablished', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="numberEmployees">Number of Employees</label><br />
      <input
        id="numberEmployees"
        type="text"
        placeholder="Number of Employees."
        value={values ? values.getIn(['numberEmployees', 'value']) : ''}
        onChange={(e) => handleChange('numberEmployees', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="annualRevenue">Annual Revenue</label><br />
      <input
        id="annualRevenue"
        type="text"
        placeholder="Annual Revenue."
        value={values ? values.getIn(['annualRevenue', 'value']) : ''}
        onChange={(e) => handleChange('annualRevenue', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="businessOwnership">Business Ownership</label><br />
      <input
        id="businessOwnership"
        type="text"
        placeholder="Business Ownership."
        value={values ? values.getIn(['businessOwnership', 'value']) : ''}
        onChange={(e) => handleChange('businessOwnership', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="contactInfo">Contact Info</label><br />
      <textarea
        className={styles.textarea}
        id="contactInfo"
        type="text"
        placeholder="Contact Info."
        value={values ? values.getIn(['contactInfo', 'value']) : ''}
        onChange={(e) => handleChange('contactInfo', e.target.value)}
      />
    </fieldset>
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
    streetTwo: company.get('streetTwo') || '',
    city: company.get('city') || '',
    state: company.get('state') || '',
    zip: company.get('zip') || '',
    phone: company.get('phone') || '',
    url: company.get('url') || '',
    email: company.get('email') || '',
    description: company.get('description') || '',
    country: company.get('country') || '',
    fax: company.get('fax') || '',
    lastContacted: company.get('lastContacted') || '',
    lastUpdated: company.get('lastUpdated') || '',
    yearEstablished: company.get('yearEstablished') || '',
    numberEmployees: company.get('numberEmployees') || '',
    annualRevenue: company.get('annualRevenue') || '',
    businessOwnership: company.get('businessOwnership') || '',
    contactInfo: company.get('contactInfo') || '',
  },
  validation: {
    name: (value) => !isNull(value),
    email: (value) => !isNull(value),
    description: (value) => !isNull(value),
  },
})(CompanyInfoForm);
