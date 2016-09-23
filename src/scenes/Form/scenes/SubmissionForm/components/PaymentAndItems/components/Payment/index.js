import React, { PropTypes } from 'react';
import { states } from 'us';
import countries from 'i18n-iso-countries';

const statesArray = ['', 'Not applicable', ...Object.keys(states)];
const countriesObject = countries.getNames('en');
const countriesArray = Object.keys(countriesObject).map(country => countriesObject[country]);

const Payment = ({ payment, onChange }) => {
  const firstName = payment.get('firstName');
  const lastName = payment.get('lastName');
  const company = payment.get('company');
  const email = payment.get('email');
  const phone = payment.get('phone');
  const address = payment.get('address');
  const city = payment.get('city');
  const state = payment.get('state');
  const zip = payment.get('zip');
  const country = payment.get('country');
  const cardNumber = payment.get('cardNumber');
  const cardCvc = payment.get('cardCvc');
  const expMonth = payment.get('expMonth');
  const expYear = payment.get('expYear');

  return (
    <div>
      <fieldset>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="John"
          onChange={onChange}
          value={firstName}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Doe"
          onChange={onChange}
          value={lastName}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder="Company Inc."
          onChange={onChange}
          value={company}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="email@gmail.com"
          onChange={onChange}
          value={email}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="1-800-123-4567"
          onChange={onChange}
          value={phone}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="123 Maple Street"
          onChange={onChange}
          value={address}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Anytown"
          onChange={onChange}
          value={city}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="state">State</label>
        <select
          id="state"
          name="state"
          onChange={onChange}
          value={state}
          required
        >
          {statesArray.map(option => (
            <option key={option} value={option}>
              {option}
            </option>)
          )}
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="zip">Zip Code</label>
        <input
          type="text"
          id="zip"
          name="zip"
          placeholder="12345"
          onChange={onChange}
          value={zip}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="country">Country</label>
        <select
          id="country"
          name="country"
          onChange={onChange}
          value={country}
          required
        >
          {countriesArray.map(option => (
            <option key={option} value={option}>
              {option}
            </option>)
          )}
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="cardNumber">Credit Card Number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          maxLength="19"
          size="19"
          placeholder="1234123412341234"
          onChange={onChange}
          value={cardNumber}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="cardCvc">CVV/CVC Number</label>
        <input
          type="text"
          id="cardCvc"
          name="cardCvc"
          maxLength="4"
          size="4"
          placeholder="1234"
          onChange={onChange}
          value={cardCvc}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="expMonth">Expiration Month</label>
        <input
          type="text"
          id="expMonth"
          name="expMonth"
          maxLength="2"
          size="2"
          placeholder="MM"
          onChange={onChange}
          value={expMonth}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="expYear">Expiration Year</label>
        <input
          type="text"
          id="expYear"
          name="expYear"
          maxLength="2"
          size="2"
          placeholder="YY"
          onChange={onChange}
          value={expYear}
          required
        />
      </fieldset>
    </div>
  );
};

Payment.propTypes = {
  payment: PropTypes.object,
  onChange: PropTypes.func,
};

export default Payment;
