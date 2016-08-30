import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal } from 'paintcan';

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
      <Container fluid>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
            <Card>
              <h3>Add new brand</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label><br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={this.state.name}
                /><br />
                <label htmlFor="image">Image URL</label><br />
                <input
                  type="text"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  value={this.state.image}
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

AddBrandDialog.propTypes = {
  closeModal: PropTypes.func,
  createBrand: PropTypes.func,
  isCreateLoading: PropTypes.bool,
};

export default AddBrandModal;
