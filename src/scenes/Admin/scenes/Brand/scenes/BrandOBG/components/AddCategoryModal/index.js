import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal } from 'paintcan';

const AddCategoryModal = withModal(
  ({ isOpen, openModal }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      Add a category
    </Button>
  ),
  ({ closeModal, createCategory, isCreateLoading }) => (
    <AddCategoryDialog
      closeModal={closeModal}
      createCategory={createCategory}
      isCreateLoading={isCreateLoading}
    />
  ),
);

class AddCategoryDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      heading: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isCreateLoading, createCategory, closeModal } = this.props;
    const { name, heading } = this.state;

    if (isCreateLoading) return;

    createCategory(name, heading);
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
              <h3>Add new category</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label><br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={this.state.name}
                /><br />
                <label htmlFor="heading">Heading</label><br />
                <input
                  type="text"
                  id="heading"
                  name="heading"
                  onChange={handleChange}
                  value={this.state.heading}
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

AddCategoryDialog.propTypes = {
  closeModal: PropTypes.func,
  createCategory: PropTypes.func,
  isCreateLoading: PropTypes.bool,
};

export default AddCategoryModal;
