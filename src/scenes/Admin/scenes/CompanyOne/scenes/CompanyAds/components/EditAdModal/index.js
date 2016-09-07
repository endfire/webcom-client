import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal } from 'paintcan';
import Select from 'react-select';

const EditAdModal = withModal(
  ({ isOpen, openModal, item }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      {item.get('brand')}
    </Button>
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
      categories: props.ad.get('categories').toArray(),
      oldCategories: props.ad.get('categories').toArray(),
      categoryOptions: props.categories,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMultiChange = this.handleMultiChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { isUpdateLoading, updateAd, closeModal } = this.props;
    const id = this.props.ad.get('id');
    const { categories, oldCategories } = this.state;

    if (isUpdateLoading) return;

    console.log(this.state);

    updateAd(id, {
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
    const { ad, closeModal } = this.props;

    return (
      // this could be a presentational component that is a sibling in this 'components' folder
      <Container fluid>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
            <Card>
              <h3>Edit {ad.get('brand')} Ad</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Remove or add categories for this ad</label>
                <Select
                  name="categories"
                  value={this.state.categories}
                  options={this.state.categoryOptions.filter(category => (
                    category.brand === ad.get('brandId')
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

EditAdDialog.propTypes = {
  closeModal: PropTypes.func,
  updateAd: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
  ad: PropTypes.object,
  categories: PropTypes.array,
};

export default EditAdModal;
