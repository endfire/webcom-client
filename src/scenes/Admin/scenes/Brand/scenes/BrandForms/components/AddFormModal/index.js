import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal } from 'paintcan';

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

    return (
      <Container fluid>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
            <Card>
              <h3>Add new form</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label><br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={this.state.name}
                /><br />
                <Button type="submit">Save Change</Button>
              </form>
              <Button onClick={closeModal}>
                Cancel
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

AddFormDialog.propTypes = {
  closeModal: PropTypes.func,
  createForm: PropTypes.func,
  isCreateLoading: PropTypes.bool,
};

export default AddFormModal;
