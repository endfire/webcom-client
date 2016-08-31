import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-fa';
import { Link } from 'react-router';
import { Button, ButtonGroup } from 'paintcan';
import { getFormFields } from 'selectors/dynamicForms';
import * as actions from 'actions/store';
import store from 'configureStore';
import { Field, AddFieldModal, PaymentBox } from './components';
import createFieldInitializerForm from './createFieldInitializerForm';
import styles from './styles.scss';

class BrandForm extends Component {
  constructor(props) {
    super(props);

    this.handleAddField = this.handleAddField.bind(this);
    this.handleAddFieldChange = this.handleAddFieldChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleTemplateChange = this.handleTemplateChange.bind(this);
    this.renderControls = this.renderControls.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
    this.renderEndpoint = this.renderEndpoint.bind(this);
    this.renderFieldInitializer = this.renderFieldInitializer.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.renderPayment = this.renderPayment.bind(this);
  }

  componentDidMount() {
    const { fetchForm, params: { formID } } = this.props;

    fetchForm(formID);
  }

  handleAddFieldChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAddField(e) {
    e.preventDefault();

    const { form, createField } = this.props;
    const { label } = this.state;

    createField({
      form: form.get('id'),
      createdOn: Date.now(),
      type: 'text',
      label,
    });
  }

  handleSave() {
    const { form, saveForm } = this.props;
  }

  handlePublish() {
    const { form, saveForm } = this.props;

    saveForm(form.get('id'), {
      didPublish: true,
    });
  }

  handleTemplateChange() {
    console.log('handleTemplateChange');
  }

  renderControls() {
    const { form } = this.props;
    const { handleAddField, handleAddFieldChange, handleSave, handlePublish } = this;

    if (!form) {
      return <Icon name="spinner" spin />;
    }

    return (
      <ButtonGroup spaced>
        <AddFieldModal
          handleAddField={handleAddField}
          handleAddFieldChange={handleAddFieldChange}
        />
        {!form.get('didPublish') ?
          <Button size="sm" onClick={handlePublish} color="success">
            <Icon name="cloud-upload" /> Publish this form
          </Button>
        :
          <Button size="sm" color="success" disabled>
            <Icon name="check" /> Published
          </Button>
        }
      </ButtonGroup>
    );
  }

  renderInfo() {
    const { form } = this.props;

    if (!form) return null;

    return (
      <div className={styles.info}>
        <form>
          <fieldset>
            <input type="text" />
          </fieldset>
        </form>
      </div>
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
          This form has been published. Visit it <Link to={`/form/${form.get('id')}`}>here</Link>.
        </span>
      </div>
    );
  }

  renderFields() {
    const { form, updateField, deleteField } = this.props;
    const state = store.getState();

    if (!form) return null;

    const fields = getFormFields(form)(state);

    return fields.map(field =>
      <Field
        key={field.get('id')}
        field={field}
        updateField={updateField}
        deleteField={deleteField}
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
    const { form } = this.props;

    if (!form) return null;
    if (!form.get('payment')) return null;

    const payment = form.get('payment');

    return <PaymentBox payment={payment} />;
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
        {this.renderFields()}
        {this.renderPayment()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  form: state.store.getIn(['entities', 'forms', ownProps.params.formID]),
});

const mapDispatchToProps = (dispatch) => ({
  fetchForm: (id) => dispatch(actions.fetchRecord('form', id)),
  fetchPayment: (id) => dispatch(actions.fetchRecord('payment', id)),
  createField: (data) => dispatch(actions.createRecord('field', data)),
  updateField: (id, data) => dispatch(actions.updateRecord('field', id, data)),
  deleteField: (id) => dispatch(actions.deleteRecord('field', 'fields', id)),
  saveForm: (id, data) => dispatch(actions.updateRecord('form', id, data)),
});

BrandForm.propTypes = {
  params: PropTypes.object,
  form: PropTypes.object,
  fetchForm: PropTypes.func,
  fetchPayment: PropTypes.func,
  updateField: PropTypes.func,
  deleteField: PropTypes.func,
  createField: PropTypes.func,
  saveForm: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BrandForm);
