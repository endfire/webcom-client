import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'paintcan';
import { Icon } from 'react-fa';
import { Fields, PaymentAndItems } from './components';
import * as actions from 'actions/submissionForm';

import styles from './styles.scss';

class FormSubmission extends Component {
  constructor(props) {
    super(props);

    this.handleEditFormField = this.handleEditFormField.bind(this);
    this.handleEditFormCheckbox = this.handleEditFormCheckbox.bind(this);
    this.handleEditFormPayment = this.handleEditFormPayment.bind(this);
    this.handleEditFormItem = this.handleEditFormItem.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.renderPaymentAndItems = this.renderPaymentAndItems.bind(this);
  }

  componentDidMount() {
    const { hydrateSubmissionForm, params: { submissionFormID } } = this.props;

    hydrateSubmissionForm(submissionFormID);
  }

  handleEditFormField(e) {
    const { editField, params: { submissionFormID } } = this.props;
    const { name, value } = e.target;

    editField(submissionFormID, name, value);
  }

  handleEditFormCheckbox(e) {
    const { editCheckbox, params: { submissionFormID } } = this.props;
    const { name, value } = e.target;

    editCheckbox(submissionFormID, name, value);
  }

  handleEditFormPayment(e) {
    const { editPayment, params: { submissionFormID } } = this.props;
    const { name, value } = e.target;

    editPayment(submissionFormID, name, value);
  }

  handleEditFormItem(e) {
    const { editItem, params: { submissionFormID } } = this.props;
    const { name, value } = e.target;

    editItem(submissionFormID, name, value);
  }

  handleSubmission() {
    const { submitSubmissionForm, params: { submissionFormID } } = this.props;

    submitSubmissionForm(submissionFormID);
  }

  renderSpinner() {
    return (
      <span>
        Loading <Icon name="spinner" spin />
      </span>
    );
  }

  renderFields() {
    const { submissionForm } = this.props;
    const { renderSpinner, handleEditFormField, handleEditFormCheckbox } = this;

    if (!submissionForm) return renderSpinner();

    const fields = submissionForm.get('fields');

    return (
      <div>
        <h2>Form: {submissionForm.get('name')}</h2>
        <Fields
          fields={fields}
          handleEditFormField={handleEditFormField}
          handleEditFormCheckbox={handleEditFormCheckbox}
        />
      </div>
    );
  }

  renderPaymentAndItems() {
    const {
      submissionForm,
      initializeSubmissionFormItems,
      params: { submissionFormID },
    } = this.props;

    if (!submissionForm) return null;
    if (submissionForm.get('payment').isEmpty()) return null;

    const payment = submissionForm.get('payment');

    return (
      <PaymentAndItems
        payment={payment}
        submissionForm={submissionForm}
        formID={submissionFormID}
        initializeSubmissionFormItems={initializeSubmissionFormItems}
        handleEditFormPayment={this.handleEditFormPayment}
        handleEditFormItem={this.handleEditFormItem}
        renderSpinner={this.renderSpinner}
      />
    );
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <form onSubmit={this.handleSubmission}>
          {this.renderFields()}
          {this.renderPaymentAndItems()}
          <Button type="submit" size="sm">
            Submit Form
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  submissionForm: state.submissionForm.get(ownProps.params.submissionFormID),
});

const mapDispatchToProps = (dispatch) => ({
  initializeSubmissionFormItems: (id) => dispatch(actions.initializeSubmissionFormItems(id)),
  hydrateSubmissionForm: (id) => dispatch(actions.hydrateSubmissionForm(id)),
  submitSubmissionForm: (id) => dispatch(actions.submitSubmissionForm(id)),
  editField: (id, name, value) => dispatch(actions.editSubmissionFormField(id, name, value)),
  editCheckbox: (id, name, value) => dispatch(actions.editSubmissionFormCheckbox(id, name, value)),
  editPayment: (id, name, value) => dispatch(actions.editSubmissionFormPayment(id, name, value)),
  editItem: (id, name, value) => dispatch(actions.editSubmissionFormItem(id, name, value)),
});

FormSubmission.propTypes = {
  params: PropTypes.object,
  submissionForm: PropTypes.object,
  initializeSubmissionFormItems: PropTypes.func,
  hydrateSubmissionForm: PropTypes.func,
  submitSubmissionForm: PropTypes.func,
  editField: PropTypes.func,
  editCheckbox: PropTypes.func,
  editPayment: PropTypes.func,
  editItem: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormSubmission);
