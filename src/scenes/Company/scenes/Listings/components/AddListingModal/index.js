import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal } from 'paintcan';
import Select from 'react-select';

const AddListingModal = withModal(
  ({ isOpen, openModal }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      Add a new listing
    </Button>
  ),
  ({ closeModal, createListing, isCreateLoading, companyID, brands }) => (
    <AddListingDialog
      closeModal={closeModal}
      createListing={createListing}
      isCreateLoading={isCreateLoading}
      companyID={companyID}
      brands={brands}
    />
  ),
);

class AddListingDialog extends Component {
  constructor(props) {
    super(props);

    console.log('Brands here', props.brands);

    this.state = {
      brand: '',
      brandId: '',
      categories: [],
      brandOptions: props.brands,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isCreateLoading, createListing, closeModal, companyID } = this.props;
    const { brand, brandId, categories } = this.state;

    if (isCreateLoading) return;

    createListing(brand, brandId, categories, companyID);
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
              <h3>Add new listing</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Select a brand</label><br />
                <Select
                  name="brand"
                  value=""
                  options={this.state.brandOptions}
                  onChange={handleChange}
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

AddListingDialog.propTypes = {
  closeModal: PropTypes.func,
  createListing: PropTypes.func,
  isCreateLoading: PropTypes.bool,
  companyID: PropTypes.string,
  brands: PropTypes.object,
};

export default AddListingModal;
