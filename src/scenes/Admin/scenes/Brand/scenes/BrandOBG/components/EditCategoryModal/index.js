import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal } from 'paintcan';

const EditCategoryModal = withModal(
  ({ isOpen, openModal, item }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      {item.get('name')}
    </Button>
  ),
  ({ closeModal, item, updateCategory, isUpdateLoading }) => (
    <EditCategoryDialog
      closeModal={closeModal}
      category={item}
      updateCategory={updateCategory}
      isUpdateLoading={isUpdateLoading}
    />
  ),
);

class EditCategoryDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.category.get('name'),
      heading: props.category.get('heading'),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isUpdateLoading, updateCategory, closeModal } = this.props;
    const id = this.props.category.get('id');
    const { name, heading } = this.state;

    if (isUpdateLoading) return;

    updateCategory(id, {
      name,
      heading,
    });
    closeModal();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const { category, closeModal } = this.props;

    return (
      <Container fluid>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
            <Card>
              <h3>Edit {category.get('name')}</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={this.state.name}
                /><br />
                <label htmlFor="heading">Heading</label>
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

EditCategoryDialog.propTypes = {
  closeModal: PropTypes.func,
  updateCategory: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
  category: PropTypes.object,
};

export default EditCategoryModal;
