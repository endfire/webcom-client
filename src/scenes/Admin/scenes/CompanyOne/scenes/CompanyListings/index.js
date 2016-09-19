import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import List from '../../components/List';
import { AddListingModal, ManageListingModal } from './components';
import { getCanUserDelete } from 'selectors/admin';
import * as actions from 'actions/store';
import { getCurrentCompanyListings } from 'selectors/adminCompanies';
import { getBrandSelectOptions, getCategorySelectOptions } from 'selectors/company';
import styles from './styles.scss';

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
      canUserDelete,
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
          {!listings.isEmpty()
            ? <List
              items={listings}
              handleDelete={this.handleDelete}
              canUserDelete={canUserDelete}
            ><ManageListingModal
              updateListing={updateListing}
              categories={categories}
              isUpdateLoading={isUpdateLoading}
            /></List>
            : <div className={styles.wrapperLoading}>
              <div>
                  No listings
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  companyID: ownProps.params.companyID,
  listings: getCurrentCompanyListings(ownProps.params.companyID)(state),
  brands: getBrandSelectOptions(state),
  categories: getCategorySelectOptions(state),
  canUserDelete: getCanUserDelete(state),
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
  canUserDelete: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listings);
