import React, { PropTypes, Component } from 'react';
import { Button, ButtonGroup, withModal } from 'paintcan';
import Select from 'react-select';
import { ModalDialog } from 'components';
import listItem from 'styles/listItem';

const ManageListingsModal = withModal(
  ({ isOpen, openModal, item }) => (
    <p active={isOpen} onClick={openModal} style={listItem}>
      {item.get('brand')}
    </p>
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
    this.setState({
      categories: value.map(category => category.value),
    });
  }

  render() {
    const { handleSubmit, handleMultiChange } = this;
    const { listing, closeModal } = this.props;

    return (
      // this could be a presentational component that is a sibling in this 'components' folder
      <ModalDialog title={`Edit ${listing.get('brand')} Listing`} size="sm" closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="name">Remove or add categories for this listing</label>
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
      </ModalDialog>
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
