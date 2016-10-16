import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import store from 'configureStore';
import { Icon } from 'react-fa';
import { Link } from 'react-router';
import { Button, ButtonGroup } from 'paintcan';

import {
  getCurrentForm,
  getCurrentFormFields,
  getCurrentFormPaymentItems,
} from 'selectors/dynamicForm';

import * as actions from 'actions/store';
import { Field, AddFieldModal, PaymentBox } from './components';
import createFieldInitializerForm from './createFieldInitializerForm';
import { getIsDeleteLoading, getIsCreateLoading, getIsUpdateLoading } from 'selectors/loading';
import styles from './styles.scss';

class BrandForm extends Component {
  constructor(props) {
    super(props);

    this.handlePublish = this.handlePublish.bind(this);
    this.handleUnpublish = this.handleUnpublish.bind(this);
    this.renderControls = this.renderControls.bind(this);
    this.renderEndpoint = this.renderEndpoint.bind(this);
    this.renderFieldInitializer = this.renderFieldInitializer.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.renderPayment = this.renderPayment.bind(this);
  }

  componentDidMount() {
    const { fetchForm, params: { formID } } = this.props;

    fetchForm(formID);
  }

  handlePublish() {
    const { form, updateForm } = this.props;

    updateForm(form.get('id'), {
      didPublish: true,
    });
  }

  handleUnpublish() {
    const { form, updateForm } = this.props;

    updateForm(form.get('id'), {
      didPublish: false,
    });
  }

  renderControls() {
    const { form, createField, isCreateLoading } = this.props;
    const { handlePublish, handleUnpublish } = this;

    if (!form) {
      return <Icon name="spinner" spin />;
    }

    const unpublishButton = (
      <Button size="sm" onClick={handleUnpublish} color="danger">
        <Icon name="warning" /> Unpublish
      </Button>
    );

    const renderPublishButton = (items) => {
      if (form.get('payment') && items.isEmpty()) {
        return (
          <Button size="sm" color="danger">
            <Icon name="warning" /> Add an item
          </Button>
        );
      }

      return (
        <Button size="sm" onClick={handlePublish} color="success">
          <Icon name="cloud-upload" /> Publish this form
        </Button>
      );
    };

    return (
      <ButtonGroup spaced>
        <AddFieldModal
          formID={form.get('id')}
          createField={createField}
          isCreateLoading={isCreateLoading}
        />
        {form.get('didPublish') ? unpublishButton : renderPublishButton(this.props.items)}
      </ButtonGroup>
    );
  }

  renderEndpoint() {
    const { form } = this.props;

    if (!form) return null;
    if (!form.get('didPublish')) return null;

    return (
      <div className={styles.endpoint}>
        <Icon name="check" size="3x" />
        <span className={styles.endpointMessage}>
          This form has been published. &nbsp;
          <Link to={`/form/${form.get('id')}`}><Button size="sm">To published form</Button></Link>
        </span>
      </div>
    );
  }

  renderFields() {
    const state = store.getState();
    const {
      form,
      updateField,
      isUpdateLoading,
      deleteField,
      isDeleteLoading,
    } = this.props;

    if (!form) return null;

    const fields = getCurrentFormFields(form.get('id'))(state);

    return fields.sortBy(field => field.get('priority')).toArray().map(field =>
      <Field
        key={field.get('id')}
        field={field}
        updateField={updateField}
        isUpdateLoading={isUpdateLoading}
        deleteField={deleteField}
        isDeleteLoading={isDeleteLoading}
      />
    );
  }

  renderFieldInitializer() {
    const { form } = this.props;

    if (!form) return null;
    if (form.get('didInitialize')) return null;

    const FieldInitializerForm = createFieldInitializerForm(form);
    return <FieldInitializerForm />;
  }

  renderPayment() {
    const {
      fetchPayment,
      form,
      items,
      createItem,
      updateItem,
      deleteItem,
      isCreateLoading,
      isUpdateLoading,
      isDeleteLoading,
    } = this.props;

    if (!form.get('payment')) return null;

    return (
      <PaymentBox
        fetchPayment={fetchPayment}
        paymentID={form.get('payment')}
        items={items}
        createItem={createItem}
        updateItem={updateItem}
        deleteItem={deleteItem}
        isCreateLoading={isCreateLoading}
        isUpdateLoading={isUpdateLoading}
        isDeleteLoading={isDeleteLoading}
      />
    );
  }

  render() {
    const { form } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h4>{form ? form.get('name') : <Icon name="spinner" spin />}</h4>
          {this.renderControls()}
        </div>
        {this.renderEndpoint()}
        {this.renderFieldInitializer()}
        {this.renderPayment()}<br />
        {this.renderFields()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  form: getCurrentForm(ownProps.params.formID)(state),
  items: getCurrentFormPaymentItems(ownProps.params.formID)(state),
  isCreateLoading: getIsCreateLoading(state),
  isUpdateLoading: getIsUpdateLoading(state),
  isDeleteLoading: getIsDeleteLoading(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchForm: (id) => dispatch(actions.fetchRecord('form', id)),
  fetchPayment: (id) => dispatch(actions.fetchRecord('payment', id)),
  createField: (data) => dispatch(actions.createRecord('field', data)),
  createItem: (data) => dispatch(actions.createRecord('item', data)),
  updateForm: (id, data) => dispatch(actions.updateRecord('form', id, data)),
  updateItem: (id, data) => dispatch(actions.updateRecord('item', id, data)),
  deleteItem: (id) => dispatch(actions.deleteRecord('item', 'items', id)),
  updateField: (id, data) =>
    dispatch(actions.updateAndFetch('field', id, data, 'form', ownProps.params.formID)),
  deleteField: (id) =>
    dispatch(actions.deleteAndFetch('field', 'fields', id, 'form', ownProps.params.formID)),
});

BrandForm.propTypes = {
  params: PropTypes.object,
  form: PropTypes.object,
  items: PropTypes.object,
  isCreateLoading: PropTypes.bool,
  isUpdateLoading: PropTypes.bool,
  isDeleteLoading: PropTypes.bool,
  fetchForm: PropTypes.func,
  fetchPayment: PropTypes.func,
  createField: PropTypes.func,
  createItem: PropTypes.func,
  updateForm: PropTypes.func,
  updateItem: PropTypes.func,
  updateField: PropTypes.func,
  deleteItem: PropTypes.func,
  deleteField: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BrandForm);
