import React, { PropTypes, Component } from 'react';
import { Button, ButtonGroup, withModal } from 'paintcan';
import { ModalDialog } from 'components';

const AddCategoryModal = withModal(
  ({ isOpen, openModal }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      Add a category
    </Button>
  ),
  ({ closeModal, createCategory, isCreateLoading }) => (
    <AddCategoryDialog
      closeModal={closeModal}
      createCategory={createCategory}
      isCreateLoading={isCreateLoading}
    />
  ),
);

class AddCategoryDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      heading: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isCreateLoading, createCategory, closeModal } = this.props;
    const { name, heading } = this.state;

    if (isCreateLoading) return;

    createCategory(name, heading);
    closeModal();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const { closeModal } = this.props;

    return (
      <ModalDialog title="Add a new category" size="sm" closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="name">Name</label><br />
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={this.state.name}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="heading">Heading</label><br />
            <input
              type="text"
              id="heading"
              name="heading"
              onChange={handleChange}
              value={this.state.heading}
            />
          </fieldset>
          <fieldset>
            <ButtonGroup spaced>
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button type="button" color="danger" onClick={closeModal}>
                Cancel
              </Button>
            </ButtonGroup>
          </fieldset>
        </form>
      </ModalDialog>
    );
  }
}

AddCategoryDialog.propTypes = {
  closeModal: PropTypes.func,
  createCategory: PropTypes.func,
  isCreateLoading: PropTypes.bool,
};

export default AddCategoryModal;
