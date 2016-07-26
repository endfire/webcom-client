import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal } from 'paintcan';
import { connect } from 'react-redux';
import { CREATE_REQUEST } from '../../../../../../actionTypes';

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
      background: '',
      text: '',
      secondary: '',
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    const { isCreateLoading, createBrand, closeModal } = this.props;

    if (isCreateLoading) return;

    const { name, image, background, text, secondary } = this.state;
    createBrand(name, image, background, text, secondary);
    closeModal();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { submitHandler, handleChange } = this;
    const { closeModal } = this.props;

    return (
      <Container fluid>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
            <Card>
              <h3>Add new brand</h3>
              <form onSubmit={submitHandler}>
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
                <label htmlFor="background">Background Color: Hex</label><br />
                <input
                  type="text"
                  id="background"
                  name="background"
                  onChange={handleChange}
                  value={this.state.background}
                /><br />
                <label htmlFor="text">Text Color: Hex</label><br />
                <input
                  type="text"
                  id="text"
                  name="text"
                  onChange={handleChange}
                  value={this.state.text}
                /><br />
                <label htmlFor="secondary">Secondary Color: Hex</label><br />
                <input
                  type="text"
                  id="secondary"
                  name="secondary"
                  onChange={handleChange}
                  value={this.state.secondary}
                /><br />
                <input type="submit" value="Save Change" />
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

const mapStateToProps = (state) => ({
  isCreateLoading: state.store.isLoading.CREATE,
});

const mapDispatchToProps = (dispatch) => ({
  createBrand: (name, image, background, text, secondary) => dispatch({
    type: CREATE_REQUEST,
    payload: {
      type: 'brand',
      record: {
        name,
        image,
        background,
        text,
        secondary,
      },
    },
  }),
});

AddBrandDialog.propTypes = {
  closeModal: PropTypes.func,
  createBrand: PropTypes.func,
  isCreateLoading: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddBrandModal);
