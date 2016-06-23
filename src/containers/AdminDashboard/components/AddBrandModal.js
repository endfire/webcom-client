import React from 'react';
import Modal from '../../../ui/Modal';
import { Button, ModalHeader, ModalBody } from 'reactstrap';

const AddBrandModal = () => (
  <Modal target={<Button color="secondary">Create a new brand</Button>}>
    <ModalHeader>Create a new brand</ModalHeader>
    <ModalBody>
      <form>
        <fieldset className="form-group">
          <label htmlFor="exampleInputEmail1">Name of the brand</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Brand
            name"
          />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="exampleInputEmail1">Brand image</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Template"
          />
        </fieldset>
        <div className="clearfix">
          <div className="btn-group pull-xs-right">
            <Button color="primary">Add brand</Button>
            <Button color="secondary">Cancel</Button>
          </div>
        </div>
      </form>
    </ModalBody>
  </Modal>
);

export default AddBrandModal;
