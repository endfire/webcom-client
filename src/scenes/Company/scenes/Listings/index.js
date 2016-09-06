import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import List from '../../components/List';
import { AddListingModal, ManageListingModal } from './components';
import * as actions from 'actions/store';
import {
  getSessionID,
  getCompanyListings,
  getBrandSelectOptions,
  getCurrentBrandCategories,
} from 'selectors/company';

class Listings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBrand: '',
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.setSelectedBrand = this.setSelectedBrand.bind(this);
  }

  componentDidMount() {
    const { findListings, companyID, findBrands } = this.props;

    findListings(companyID);
    findBrands();
  }

  setSelectedBrand(selectedBrand) {
    console.log('Hello I am setting the brand to', selectedBrand);
    this.setState({ selectedBrand });
  }

  handleDelete(id) {
    const { isDeleteLoading, deleteListing } = this.props;

    if (isDeleteLoading) return;

    deleteListing(id);
  }

  render() {
    const {
      listings,
      brands,
      categories,
      findCategories,
      createListing,
      isCreateLoading,
      updateListing,
      isUpdateLoading,
      companyID,
    } = this.props;

    return (
      <Container fluid><br />
        <Row>
          <Col size={{ xs: 4 }} align={{ xs: 'left' }}>
            <AddListingModal
              createListing={createListing}
              isCreateLoading={isCreateLoading}
              companyID={companyID}
              brands={brands}
              categories={categories}
              findCategories={findCategories}
              setSelectedBrand={this.setSelectedBrand}
            /><br /><br /><br />
            {listings
              ? <List
                items={listings}
                handleDelete={this.handleDelete}
              ><ManageListingModal
                updateListing={updateListing}
                isUpdateLoading={isUpdateLoading}
              /></List>
              : 'Loading...'}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    companyID: getSessionID(state),
    listings: getCompanyListings(state),
    brands: getBrandSelectOptions(state),
    categories: getCurrentBrandCategories(ownProps.selectedBrand)(state),
    isDeleteLoading: state.store.getIn(['isLoading', 'DELETE']),
    isCreateLoading: state.store.getIn(['isLoading', 'CREATE']),
    isUpdateLoading: state.store.getIn(['isLoading', 'UPDATE']),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateListing: (id, data) => dispatch(actions.updateRecord('listing', id, data)),
  deleteListing: (id) => dispatch(actions.deleteRecord('listing', 'listings', id)),
  findListings: (companyID) => dispatch(actions.fetchRelated('company', companyID, 'listings')),
  findBrands: () => dispatch(actions.findRecords('brand')),
  findCategories: (brandId) => dispatch(actions.fetchRelated('brand', brandId, 'categories')),
  createListing: (name, brand, brandId, categories, companyID) =>
    dispatch(actions.createRecord('listing', {
      brand,
      brandId,
      categories,
      company: companyID,
    })),
});

Listings.propTypes = {
  listings: PropTypes.object,
  brands: PropTypes.array,
  categories: PropTypes.array,
  companyID: PropTypes.string,
  findListings: PropTypes.func,
  findBrands: PropTypes.func,
  findCategories: PropTypes.func,
  isDeleteLoading: PropTypes.bool,
  deleteListing: PropTypes.func,
  isCreateLoading: PropTypes.bool,
  createListing: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
  updateListing: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listings);
