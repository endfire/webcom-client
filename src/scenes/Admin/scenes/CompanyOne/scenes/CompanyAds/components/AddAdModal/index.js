import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal } from 'paintcan';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const AddAdModal = withModal(
  ({ isOpen, openModal }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      Add a new ad
    </Button>
  ),
  ({ closeModal,
    createAd,
    isCreateLoading,
    companyID,
    brands,
    categories,
    findCategories,
  }) => (
    <AddAdDialog
      closeModal={closeModal}
      createAd={createAd}
      isCreateLoading={isCreateLoading}
      companyID={companyID}
      brands={brands}
      categories={categories}
      findCategories={findCategories}
    />
  ),
);

class AddAdDialog extends Component {
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

    const { isCreateLoading, createAd, closeModal, companyID } = this.props;
    const { brand, brandId, categories } = this.state;

    if (isCreateLoading) return;

    createAd({ brand, brandId, categories, companyID });
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
      this.props.findCategories(val.value);
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
        <Select
          name="categories"
          value={this.state.categories}
          options={this.state.categoryOptions.filter(category => (
            category.brand === this.state.brandId
          ))}
          onChange={handleMultiChange}
          multi
        />
      );
    }

    return '';
  }
  render() {
    const { handleSubmit, handleSelectChange, handleMultiChange } = this;
    const { closeModal } = this.props;

    return (
      <Container fluid>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
            <Card>
              <h3>Add new ad</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Select a brand</label><br />
                <Select
                  name="brand"
                  value={this.state.brandId}
                  options={this.state.brandOptions}
                  onChange={handleSelectChange}
                  placeholder="Please select a brand"
                /><br />
                {this.renderCategorySelect(handleMultiChange)}
                <br />
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

AddAdDialog.propTypes = {
  closeModal: PropTypes.func,
  createAd: PropTypes.func,
  isCreateLoading: PropTypes.bool,
  companyID: PropTypes.string,
  brands: PropTypes.array,
  findCategories: PropTypes.func,
  categories: PropTypes.array,
};

export default AddAdModal;
