import React from 'react';
import { Icon } from 'react-fa';
import { Button, withModal } from 'paintcan';
import { ModalDialog } from 'components';

const AddFieldModal = withModal(
  ({ openModal }) => (
    <Button size="sm" onClick={openModal} color="primary">
      <Icon name="plus" /> Add field
    </Button>
  ),
  ({ handleAddField, handleAddFieldChange, closeModal }) => (
    <ModalDialog title="Add a field" closeModal={closeModal} size="sm">
      <form onSubmit={(e) => handleAddField(e) && closeModal()}>
        <fieldset>
          <label htmlFor="label">Label</label>
          <input
            id="label"
            name="label"
            type="text"
            onChange={handleAddFieldChange}
            placeholder="Field description"
          />
        </fieldset>
        <fieldset>
          <Button type="submit" color="primary" block>
            Add field
          </Button>
        </fieldset>
      </form>
    </ModalDialog>
  )
);

export default AddFieldModal;
