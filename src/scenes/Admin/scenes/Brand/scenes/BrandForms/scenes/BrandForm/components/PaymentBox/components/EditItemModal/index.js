import React, { PropTypes, Component } from 'react';
import { Icon } from 'react-fa';
import { Button, ButtonGroup, withModal } from 'paintcan';
import { ModalDialog } from 'components';

const EditItemModal = withModal(
  ({ openModal }) => (
    <Button size="sm" onClick={openModal} color="primary">
      <Icon name="edit" /> Edit payment item
    </Button>
  ),
  ({ closeModal, item, updateItem, isUpdateLoading }) => (
    <EditItemDialog
      closeModal={closeModal}
      item={item}
      updateItem={updateItem}
      isUpdateLoading={isUpdateLoading}
    />
  ),
);

class EditItemDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: props.item.get('label'),
      price: props.item.get('price'),
      description: props.item.get('description'),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { item, updateItem, isUpdateLoading, closeModal } = this.props;
    const { label, price, description } = this.state;

    if (isUpdateLoading) return;

    updateItem(item.get('id'), {
      label,
      price,
      description,
    });

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
      <ModalDialog title="Edit item" size="sm" closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="label">Label</label><br />
            <input
              type="text"
              id="label"
              name="label"
              onChange={handleChange}
              value={this.state.label}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="price">Price</label><br />
            <input
              type="text"
              id="price"
              name="price"
              onChange={handleChange}
              value={this.state.price}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="description">Description</label><br />
            <input
              type="text"
              id="description"
              name="description"
              onChange={handleChange}
              value={this.state.description}
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

EditItemDialog.propTypes = {
  closeModal: PropTypes.func,
  item: PropTypes.object,
  updateItem: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
};

export default EditItemModal;
