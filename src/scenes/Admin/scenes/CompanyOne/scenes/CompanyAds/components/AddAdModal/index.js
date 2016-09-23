import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import { Button, withModal, ButtonGroup } from 'paintcan';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { ModalDialog } from 'components';

const AddAdModal = withModal(
  ({ isOpen, openModal }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      Add an OBG
    </Button>
  ),
  ({ closeModal,
    createAd,
    isCreateLoading,
    companyID,
    brands,
    categories,
  }) => (
    <AddAdDialog
      closeModal={closeModal}
      createAd={createAd}
      isCreateLoading={isCreateLoading}
      companyID={companyID}
      brands={brands}
      categories={categories}
    />
  ),
);

class AddAdDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brand: '',
      brandId: '',
      image: '',
      url: '',
      start: moment(),
      end: moment(),
      priority: 0,
      categories: [],
      brandOptions: props.brands,
      categoryOptions: props.categories,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleMultiChange = this.handleMultiChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isCreateLoading, createAd, closeModal, companyID } = this.props;
    const {
      brand,
      brandId,
      categories,
      image,
      url,
      start,
      end,
      priority,
     } = this.state;

    if (isCreateLoading) return;

    createAd({
      brand,
      brandId,
      image,
      url,
      start,
      end,
      priority,
      categories,
      companyID,
    });
    closeModal();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleStartChange(date) {
    this.setState({
      start: date,
    });
  }

  handleEndChange(date) {
    this.setState({
      end: date,
    });
  }

  handleMultiChange(value) {
    if (value) {
      this.setState({
        categories: value.map(category => category.value),
      });
    } else {
      this.setState({
        categories: [],
      });
    }
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
          <label>Select all categories for this ad</label><br />
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
    const {
      handleSubmit,
      handleSelectChange,
      handleMultiChange,
      handleChange,
      handleStartChange,
      handleEndChange,
    } = this;
    const { closeModal } = this.props;

    return (
      <ModalDialog title="Add a new OBG" size="lg" closeModal={closeModal}>
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
          {this.state.categoryOptions.length > 0
            ? this.renderCategorySelect(handleMultiChange)
            : ''
          }
          <fieldset>
            <label htmlFor="name">Image URL</label><br />
            <input
              type="text"
              id="image"
              name="image"
              onChange={handleChange}
              value={this.state.image}
              placeholder="http://example.com/image.jpg"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="name">OBG URL</label><br />
            <input
              type="text"
              id="url"
              name="url"
              onChange={handleChange}
              value={this.state.url}
              placeholder="http://example.com"
            />
          </fieldset>
          <fieldset>
            <label>Start date</label><br />
            <DatePicker
              selected={this.state.start}
              onChange={handleStartChange}
            />
          </fieldset>
          <fieldset>
            <label>End date</label><br />
            <DatePicker
              selected={this.state.end}
              onChange={handleEndChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="priority">Priority</label><br />
            <input
              type="number"
              id="priority"
              name="priority"
              onChange={handleChange}
              value={this.state.priority}
              placeholder="1 - 100"
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

AddAdDialog.propTypes = {
  closeModal: PropTypes.func,
  createAd: PropTypes.func,
  isCreateLoading: PropTypes.bool,
  companyID: PropTypes.string,
  brands: PropTypes.array,
  categories: PropTypes.array,
};

export default AddAdModal;
