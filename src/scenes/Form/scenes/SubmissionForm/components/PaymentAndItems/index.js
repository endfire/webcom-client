import React, { PropTypes } from 'react';
import { Payment, Items } from './components';

const PaymentAndItems = ({
  payment,
  items,
  handleEditFormPayment,
  handleEditFormItem,
  renderSpinner,
}) => (
  <div>
    <Payment payment={payment} onChange={handleEditFormPayment} />
    {items
      ? <Items items={items} onChange={handleEditFormItem} />
      : renderSpinner()
    }
  </div>
);

PaymentAndItems.propTypes = {
  payment: PropTypes.object,
  items: PropTypes.object,
  handleEditFormPayment: PropTypes.func,
  handleEditFormItem: PropTypes.func,
  renderSpinner: PropTypes.func,
};

export default PaymentAndItems;
