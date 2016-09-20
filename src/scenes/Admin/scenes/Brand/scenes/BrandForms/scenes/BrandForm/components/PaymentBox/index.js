import React, { Component, PropTypes } from 'react';
import { AddItemModal, Item } from './components';
import styles from './styles.scss';

class PaymentBox extends Component {
  componentDidMount() {
    const { fetchPayment, paymentID } = this.props;

    fetchPayment(paymentID);
  }

  render() {
    const {
      items,
      paymentID,
      createItem,
      updateItem,
      deleteItem,
      isCreateLoading,
      isUpdateLoading,
      isDeleteLoading,
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          This form accepts payments. Add the items that can be sold in this form.
        </div><br />
        <AddItemModal
          paymentID={paymentID}
          createItem={createItem}
          isCreateLoading={isCreateLoading}
        /><br /><br />
        {items.map(item =>
          <Item
            key={item.get('id')}
            item={item}
            updateItem={updateItem}
            deleteItem={deleteItem}
            isUpdateLoading={isUpdateLoading}
            isDeleteLoading={isDeleteLoading}
          />
        )}
      </div>
    );
  }
}

PaymentBox.propTypes = {
  fetchPayment: PropTypes.func,
  paymentID: PropTypes.string,
  items: PropTypes.object,
  createItem: PropTypes.func,
  updateItem: PropTypes.func,
  deleteItem: PropTypes.func,
  isCreateLoading: PropTypes.bool,
  isUpdateLoading: PropTypes.bool,
  isDeleteLoading: PropTypes.bool,
};

export default PaymentBox;
