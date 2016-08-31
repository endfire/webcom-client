import React, { PropTypes, Component } from 'react';
import { Button, ButtonGroup, withModal } from 'paintcan';
import { ModalDialog } from 'components';
import * as templates from 'data/templates';

const AddFormModal = withModal(
  ({ isOpen, openModal }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      Create a new form
    </Button>
  ),
  ({ closeModal, createForm, isCreateLoading }) => (
    <AddFormDialog
      closeModal={closeModal}
      createForm={createForm}
      isCreateLoading={isCreateLoading}
    />
  ),
);

class AddFormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isCreateLoading, createForm, closeModal } = this.props;
    const { name } = this.state;

    if (isCreateLoading) return;

    createForm(name);
    closeModal();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const { closeModal } = this.props;

    const options = Object.keys(templates)
      .map(template => ([templates[template].id, templates[template].name]))
      .concat([['', 'Select a form template']])
      .reverse();

    return (
      <ModalDialog title="Add a form" size="sm" closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={this.state.name}
              placeholder="Order a directory form"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="template">Template</label>
            <select name="template" onChange={handleChange}>
              {options.map(([value, label]) =>
                <option key={value} value={value}>{label}</option>
              )}
            </select>
          </fieldset>
          <fieldset>
            <ButtonGroup spaced>
              <Button onClick={closeModal} color="danger">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save Change
              </Button>
            </ButtonGroup>
          </fieldset>
        </form>
      </ModalDialog>
    );
  }
}

AddFormDialog.propTypes = {
  closeModal: PropTypes.func,
  createForm: PropTypes.func,
  isCreateLoading: PropTypes.bool,
};

export default AddFormModal;
