import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import List from '../../components/List';
import { AddListingModal, ManageListingModal } from './components';
import * as actions from 'actions/store';
import styles from './styles.scss';

import {
  getSessionID,
  getCompanyListings,
  getBrandSelectOptions,
  getCategorySelectOptions,
} from 'selectors/company';

class Listings extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { findListings, companyID, findBrands } = this.props;

    findListings(companyID);
    findBrands();
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
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <AddListingModal
            createListing={createListing}
            isCreateLoading={isCreateLoading}
            companyID={companyID}
            brands={brands}
            categories={categories}
            findCategories={findCategories}
          />
        </div>
        <div className={styles.container}>
          {listings
            ? <List
              items={listings}
              handleDelete={this.handleDelete}
            ><ManageListingModal
              updateListing={updateListing}
              categories={categories}
              isUpdateLoading={isUpdateLoading}
            /></List>
            : 'Loading...'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  companyID: getSessionID(state),
  listings: getCompanyListings(state),
  brands: getBrandSelectOptions(state),
  categories: getCategorySelectOptions(state),
  isDeleteLoading: state.store.getIn(['isLoading', 'DELETE']),
  isCreateLoading: state.store.getIn(['isLoading', 'CREATE']),
  isUpdateLoading: state.store.getIn(['isLoading', 'UPDATE']),
});

const mapDispatchToProps = (dispatch) => ({
  updateListing: (id, data) => dispatch(actions.updateRecord('listing', id, data)),
  deleteListing: (id) => dispatch(actions.deleteRecord('listing', 'listings', id)),
  findListings: (companyID) => dispatch(
    actions.fetchRelated('company', companyID, 'listings', 'listing')
  ),
  findBrands: () => dispatch(actions.findRecords('brand')),
  findCategories: (brandId) => dispatch(
    actions.fetchRelated('brand', brandId, 'categories', 'category')
  ),
  createListing: ({ brand, brandId, categories, companyID }) =>
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
