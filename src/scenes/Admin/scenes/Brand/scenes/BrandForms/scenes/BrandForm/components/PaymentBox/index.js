import React, { PropTypes } from 'react';
import { AddItemModal } from './components';
import styles from './styles.scss';

const PaymentBox = ({ payment }) => (
  <div className={styles.wrapper}>
    <div className={styles.header}>
      This form accepts payments. Add the items that can be sold in this form.
    </div>
    <div>
      {console.log('payment:', payment)}
    </div>
    <AddItemModal />
  </div>
);

PaymentBox.propTypes = {
  payment: PropTypes.object,
};

export default PaymentBox;
