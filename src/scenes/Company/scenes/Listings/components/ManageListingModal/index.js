import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal, ButtonGroup } from 'paintcan';
import Select from 'react-select';

const h3Style = {
  cursor: 'pointer',
  color: 'blue',
};

const ManageListingsModal = withModal(
  ({ isOpen, openModal, item }) => (
    <h3 active={isOpen} onClick={openModal} style={h3Style}>
      {item.get('brand')}
    </h3>
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

    updateListing(id, {
      categories: {
        old: oldCategories,
        new: categories,
      },
    });

    closeModal();
  }

  handleMultiChange(value) {
    if (value) {
      this.setState({
        categories: value.map(category => category.value),
      });
    } else {
      this.setState({ categories: [] });
    }
  }

  render() {
    const { handleSubmit, handleMultiChange } = this;
    const { listing, closeModal } = this.props;

    return (
      <Container fluid>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
            <Card>
              <h3>Edit {listing.get('brand')} Listing</h3>
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <label htmlFor="name">Remove or add categories for this listing</label><br />
                  <Select
                    name="categories"
                    value={this.state.categories}
                    options={this.state.categoryOptions.filter(category => (
                      category.brand === listing.get('brandId')
                    ))}
                    onChange={handleMultiChange}
                    multi
                  />
                </fieldset>
                <fieldset>
                  <ButtonGroup spaced>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                    <Button type="button" color="danger" onClick={closeModal}>
                      Cancel
                    </Button>
                  </ButtonGroup>
                </fieldset>
              </form>
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
