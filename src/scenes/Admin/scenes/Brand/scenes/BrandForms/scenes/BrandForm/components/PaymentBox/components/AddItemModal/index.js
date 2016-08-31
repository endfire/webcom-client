import React from 'react';
import { Button, withModal } from 'paintcan';
import { ModalDialog } from 'components';

const AddItemModal = withModal(
  ({ openModal }) => (
    <Button color="primary" onClick={openModal}>
      Add item
    </Button>
  ),
  ({ closeModal, handleAddItem, handleItemChange }) => (
    <ModalDialog title="Add a new item" size="sm" closeModal={closeModal}>
      <form>
        <fieldset onSubmit={() => handleAddItem() && closeModal()}>
          <label htmlFor="label">Label</label>
          <input
            type="text"
            id="label"
            name="label"
            onChange={handleItemChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            onChange={handleItemChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            onChange={handleItemChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleItemChange}
          />
        </fieldset>
        <fieldset>
          <Button color="primary" type="submit">
            Add item
          </Button>
        </fieldset>
      </form>
    </ModalDialog>
  )
);

export default AddItemModal;
