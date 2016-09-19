import React, { PropTypes } from 'react';

const Payment = ({ payment, onChange }) => {
  const expMonth = payment.get('expMonth');
  const expYear = payment.get('expYear');
  const cardNumber = payment.get('cardNumber');
  const cardCvc = payment.get('cardCvc');
  const firstName = payment.get('firstName');
  const lastName = payment.get('lastName');
  const email = payment.get('email');

  return (
    <div>
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
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="myemail@gmail.com"
          onChange={onChange}
          value={email}
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
