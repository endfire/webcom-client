import React, { PropTypes } from 'react';
import { Icon } from 'react-fa';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const DeleteModal = ({
  text,
  isOpen,
  onToggle,
  onSuccess,
  onCancel,
}) => (
  <Modal
    isOpen={isOpen}
    toggle={onToggle}
  >
    <ModalBody><Icon name="trash" />{" "}{text}</ModalBody>
    <ModalFooter>
      <Button color="danger" onClick={onSuccess}>Yes</Button>
      <Button color="secondary" onClick={onCancel}>No</Button>
    </ModalFooter>
  </Modal>
);

DeleteModal.propTypes = {
  text: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteModal;
