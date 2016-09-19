import React, { PropTypes, Component } from 'react';
import DatePicker from 'react-datepicker';
import { Button, withModal, ButtonGroup } from 'paintcan';
import Select from 'react-select';
import moment from 'moment';
import { ModalDialog } from 'components';
import listItem from 'styles/listItem';

const EditAdModal = withModal(
  ({ openModal, item }) => (
    <p onClick={openModal} style={listItem}>
      {item.get('brand')}
    </p>
  ),
  ({ closeModal, item, updateAd, isUpdateLoading, categories }) => (
    <EditAdDialog
      closeModal={closeModal}
      ad={item}
      categories={categories}
      updateAd={updateAd}
      isUpdateLoading={isUpdateLoading}
    />
  ),
);

class EditAdDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brand: props.ad.get('brand'),
      brandId: props.ad.get('brandId'),
      image: props.ad.get('image'),
      url: props.ad.get('url'),
      start: moment(props.ad.get('start')),
      end: moment(props.ad.get('end')),
      priority: props.ad.get('priority'),
      categories: props.ad.get('categories').toArray(),
      oldCategories: props.ad.get('categories').toArray(),
      categoryOptions: props.categories,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleMultiChange = this.handleMultiChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { isUpdateLoading, updateAd, closeModal } = this.props;
    const id = this.props.ad.get('id');
    const {
      categories,
      image,
      url,
      start,
      end,
      priority,
      oldCategories,
     } = this.state;

    if (isUpdateLoading) return;

    updateAd(id, {
      image,
      url,
      start,
      end,
      priority,
      categories: {
        old: oldCategories,
        new: categories,
      },
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

  render() {
    const {
      handleSubmit,
      handleMultiChange,
      handleChange,
      handleStartChange,
      handleEndChange,
    } = this;
    const { ad, closeModal } = this.props;

    return (
      <ModalDialog title={`Edit ${ad.get('brand')} Ad`} size="sm" closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="name">Ad URL</label><br />
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

EditAdDialog.propTypes = {
  closeModal: PropTypes.func,
  updateAd: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
  ad: PropTypes.object,
  categories: PropTypes.array,
};

export default EditAdModal;
