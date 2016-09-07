import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal } from 'paintcan';
import Select from 'react-select';

const ManageListingsModal = withModal(
  ({ isOpen, openModal, item }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      {item.get('brand')}
    </Button>
  ),
  ({ closeModal, item, updateListing, isUpdateLoading, categories }) => (
    <EditListingDialog
      closeModal={closeModal}
      listing={item}
      categories={categories}
      updateListing={updateListing}
      isUpdateLoading={isUpdateLoading}
    />
  ),
);

class EditListingDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: props.listing.get('categories').toArray(),
      oldCategories: props.listing.get('categories').toArray(),
      categoryOptions: props.categories,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMultiChange = this.handleMultiChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { isUpdateLoading, updateListing, closeModal } = this.props;
    const id = this.props.listing.get('id');
    const { categories, oldCategories } = this.state;

    if (isUpdateLoading) return;

    console.log(this.state);

    updateListing(id, {
      categories: {
        old: oldCategories,
        new: categories,
      },
    });

    closeModal();
  }

  handleMultiChange(value) {
    this.setState({
      categories: value.map(category => category.value),
    });
  }

  render() {
    const { handleSubmit, handleMultiChange } = this;
    const { listing, closeModal } = this.props;

    return (
      // this could be a presentational component that is a sibling in this 'components' folder
      <Container fluid>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
            <Card>
              <h3>Edit {listing.get('brand')} Listing</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Remove or add categories for this listing</label>
                <Select
                  name="categories"
                  value={this.state.categories}
                  options={this.state.categoryOptions.filter(category => (
                    category.brand === listing.get('brandId')
                  ))}
                  onChange={handleMultiChange}
                  multi
                /><br /><br />
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

EditListingDialog.propTypes = {
  closeModal: PropTypes.func,
  updateListing: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
  listing: PropTypes.object,
  categories: PropTypes.array,
};

export default ManageListingsModal;
