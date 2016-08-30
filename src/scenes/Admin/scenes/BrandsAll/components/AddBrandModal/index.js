import React, { PropTypes, Component } from 'react';
import { Button, ButtonGroup, withModal } from 'paintcan';
import { ModalDialog } from 'components';

const AddBrandModal = withModal(
  ({ isOpen, openModal }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      Add a new brand
    </Button>
  ),
  ({ closeModal, createBrand, isCreateLoading }) => (
    <AddBrandDialog
      closeModal={closeModal}
      createBrand={createBrand}
      isCreateLoading={isCreateLoading}
    />
  ),
);

class AddBrandDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      image: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isCreateLoading, createBrand, closeModal } = this.props;
    const { name, image } = this.state;

    if (isCreateLoading) return;

    createBrand(name, image);
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
      <ModalDialog title="Add a new brand" size="sm" closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={this.state.name}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              onChange={handleChange}
              value={this.state.image}
            />
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

AddBrandDialog.propTypes = {
  closeModal: PropTypes.func,
  createBrand: PropTypes.func,
  isCreateLoading: PropTypes.bool,
};

export default AddBrandModal;
