import React, { Component, PropTypes } from 'react';
import { Payment, Items } from './components';

class PaymentAndItems extends Component {
  componentDidMount() {
    const { initializeSubmissionFormItems, formID } = this.props;

    initializeSubmissionFormItems(formID);
  }

  renderItems() {
    const { handleEditFormItem, submissionForm, renderSpinner } = this.props;
    const items = submissionForm.get('items');

    if (!items) return renderSpinner();

    return (
      <div>
        <Items items={items} onChange={handleEditFormItem} />
      </div>
    );
  }

  render() {
    const { payment, handleEditFormPayment } = this.props;

    return (
      <div>
        {this.renderItems()}
        <h3>Payment Information</h3>
        <Payment payment={payment} onChange={handleEditFormPayment} />
      </div>
    );
  }
}

PaymentAndItems.propTypes = {
  payment: PropTypes.object,
  formID: PropTypes.string,
  submissionForm: PropTypes.object,
  initializeSubmissionFormItems: PropTypes.func,
  handleEditFormPayment: PropTypes.func,
  handleEditFormItem: PropTypes.func,
  renderSpinner: PropTypes.func,
};

export default PaymentAndItems;
