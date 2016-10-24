/* eslint-disable max-len */
import React, { PropTypes } from 'react';
import { Button, ButtonGroup } from 'paintcan';
import { states } from 'us';
import countries from 'i18n-iso-countries';
import { withForm } from 'components';
import * as names from 'constants/formNames';
import isNull from 'validator/lib/isNull';
import styles from './settings.scss';

const { keys } = Object;

const canadianProvinces =
  ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];
const statesArray = ['', 'Not applicable', ...keys(states), ...canadianProvinces];

const countriesObject = countries.getNames('en');
const countriesArray = keys(countriesObject).map(country => countriesObject[country]);

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
        placeholder="Denver"
        value={values ? values.getIn(['city', 'value']) : ''}
        onChange={(e) => handleChange('city', e.target.value)}
      />
    </fieldset>
    <fieldset>
      <label htmlFor="state">State</label>
      <select
        id="state"
        name="state"
        value={values ? values.getIn(['state', 'value']) : ''}
        onChange={(e) => handleChange('state', e.target.value)}
      >
        {statesArray.map(option => (
          <option key={option} value={option}>
            {option}
          </option>)
        )}
      </select>
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
      <label htmlFor="country">Country</label>
      <select
        id="country"
        name="country"
        value={values ? values.getIn(['country', 'value']) : ''}
        onChange={(e) => handleChange('country', e.target.value)}
      >
        {countriesArray.map(option => (
          <option key={option} value={option}>
            {option}
          </option>)
        )}
      </select>
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
      <textarea
        className={styles.textarea}
        id="description"
        type="text"
        placeholder="We provide XYZ to customers all over the US"
        value={values ? values.getIn(['description', 'value']) : ''}
        onChange={(e) => handleChange('description', e.target.value)}
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
      <select
        id="businessOwnership"
        value={values ? values.getIn(['businessOwnership', 'value']) : ''}
        onChange={(e) => handleChange('businessOwnership', e.target.value)}
      >
        <option value="">Select an option</option>
        <option value="GOVERNMENT">GOVERNMENT</option>
        <option value="NON-PROFIT">NON-PROFIT</option>
        <option value="PRIVATE">PRIVATE</option>
        <option value="PUBLIC">PUBLIC</option>
      </select>
    </fieldset>
    <input id="oldName" value={values ? values.getIn(['oldName', 'value']) : ''} type="text" hidden />
    <input id="oldStreet" value={values ? values.getIn(['oldStreet', 'value']) : ''} type="text" hidden />
    <input id="oldStreetTwo" value={values ? values.getIn(['oldStreetTwo', 'value']) : ''} type="text" hidden />
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
    streetTwo: company.get('streetTwo') || '',
    city: company.get('city') || '',
    state: company.get('state') || '',
    zip: company.get('zip') || '',
    country: company.get('country') || 'United States',
    phone: company.get('phone') || '',
    fax: company.get('fax') || '',
    url: company.get('url') || '',
    email: company.get('email') || '',
    description: company.get('description') || '',
    yearEstablished: company.get('yearEstablished') || '',
    numberEmployees: company.get('numberEmployees') || '',
    annualRevenue: company.get('annualRevenue') || '',
    businessOwnership: company.get('businessOwnership') || '',
    oldName: company.get('name') || '',
    oldStreet: company.get('street') || '',
    oldStreetTwo: company.get('streetTwo') || '',
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
