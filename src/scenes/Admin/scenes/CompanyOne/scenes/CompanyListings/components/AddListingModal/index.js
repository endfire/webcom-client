import React, { PropTypes, Component } from 'react';
import { Button, ButtonGroup, withModal } from 'paintcan';
import Select from 'react-select';
import { ModalDialog } from 'components';

const AddListingModal = withModal(
  ({ isOpen, openModal }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      Add a new listing
    </Button>
  ),
  ({ closeModal,
    createListing,
    isCreateLoading,
    companyID,
    brands,
    categories,
  }) => (
    <AddListingDialog
      closeModal={closeModal}
      createListing={createListing}
      isCreateLoading={isCreateLoading}
      companyID={companyID}
      brands={brands}
      categories={categories}
    />
  ),
);

class AddListingDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brand: '',
      brandId: '',
      categories: [],
      brandOptions: props.brands,
      categoryOptions: props.categories,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleMultiChange = this.handleMultiChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isCreateLoading, createListing, closeModal, companyID } = this.props;
    const { brand, brandId, categories } = this.state;

    if (isCreateLoading) return;

    createListing({ brand, brandId, categories, companyID });
    closeModal();
  }

  handleMultiChange(value) {
    this.setState({
      categories: value.map(category => category.value),
    });
  }

  handleSelectChange(val) {
    this.setState({ categories: [] });

    if (val) {
      this.setState({ brandId: val.value });
      this.setState({ brand: val.label });
    } else {
      this.setState({ brandId: '' });
      this.setState({ brand: '' });
    }
  }

  renderCategorySelect(handleMultiChange) {
    if (this.state.brand) {
      return (
        <fieldset>
          <label htmlFor="name">Select a all categories for this listing</label><br />
          <Select
            name="categories"
            value={this.state.categories}
            options={this.state.categoryOptions.filter(category => (
              category.brand === this.state.brandId
            ))}
            onChange={handleMultiChange}
            multi
          />
        </fieldset>
      );
    }

    return '';
  }
  render() {
    const { handleSubmit, handleSelectChange, handleMultiChange } = this;
    const { closeModal } = this.props;

    return (
      <ModalDialog title="Add a new listing" size="sm" closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="name">Select a brand</label><br />
            <Select
              name="brand"
              value={this.state.brandId}
              options={this.state.brandOptions}
              onChange={handleSelectChange}
              placeholder="Please select a brand"
            />
          </fieldset>
          {this.renderCategorySelect(handleMultiChange)}
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

AddListingDialog.propTypes = {
  closeModal: PropTypes.func,
  createListing: PropTypes.func,
  isCreateLoading: PropTypes.bool,
  companyID: PropTypes.string,
  brands: PropTypes.array,
  categories: PropTypes.array,
};

export default AddListingModal;
