import React, { PropTypes, Component } from 'react';
import { Icon } from 'react-fa';
import { Button, ButtonGroup, withModal } from 'paintcan';
import { ModalDialog } from 'components';

const AddFieldModal = withModal(
  ({ openModal }) => (
    <Button size="sm" onClick={openModal} color="primary">
      <Icon name="plus" /> Add payment item
    </Button>
  ),
  ({ closeModal, paymentID, createItem, isCreateLoading }) => (
    <AddFieldDialog
      closeModal={closeModal}
      paymentID={paymentID}
      createItem={createItem}
      isCreateLoading={isCreateLoading}
    />
  ),
);

class AddFieldDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: '',
      priority: '',
      price: '',
      description: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { paymentID, createItem, isCreateLoading, closeModal } = this.props;
    const { label, priority, price, description } = this.state;

    if (isCreateLoading) return;

    createItem({
      payment: paymentID,
      quantity: '0',
      label,
      priority,
      price,
      description,
    });

    closeModal();
  }

  render() {
    const { closeModal } = this.props;
    const { handleSubmit, handleChange } = this;

    return (
      <ModalDialog title="Add a payment item" size="sm" closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="label">Label</label>
            <input
              type="text"
              id="label"
              name="label"
              onChange={handleChange}
              value={this.state.label}
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="priority">Priority</label><br />
            <input
              type="number"
              id="priority"
              name="priority"
              min="0"
              onChange={handleChange}
              value={this.state.priority}
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="price">Price (USD)</label>
            <input
              type="text"
              id="price"
              name="price"
              onChange={handleChange}
              value={this.state.price}
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              onChange={handleChange}
              value={this.state.description}
              required
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

AddFieldDialog.propTypes = {
  paymentID: PropTypes.string,
  createItem: PropTypes.func,
  isCreateLoading: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default AddFieldModal;
