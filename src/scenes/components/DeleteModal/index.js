import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal } from 'paintcan';

const DeleteModal = withModal(
  ({ isOpen, openModal }) => (
    <Button active={isOpen} onClick={openModal} color="danger">
      Delete
    </Button>
  ),
  ({ closeModal, handleDelete }) => (
    <DeleteDialog
      closeModal={closeModal}
      handleDelete={handleDelete}
    />
  ),
);

class DeleteDialog extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.handleDelete();
    this.props.closeModal();
  }

  render() {
    return (
      <Container fluid>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
            <Card>
              <h3>Delete this item?</h3>
              <Button onClick={this.handleClick}>
                Delete
              </Button>
              <Button onClick={this.props.closeModal}>
                Cancel
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

DeleteDialog.propTypes = {
  closeModal: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default DeleteModal;
