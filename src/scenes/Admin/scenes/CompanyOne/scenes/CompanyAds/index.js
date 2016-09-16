import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import List from '../../components/List';
import { AddAdModal, EditAdModal } from './components';
import { getCanUserDelete } from 'selectors/admin';
import * as actions from 'actions/store';
import { getCurrentCompanyAds } from 'selectors/adminCompanies';
import { getBrandSelectOptions, getCategorySelectOptions } from 'selectors/company';
import styles from './styles.scss';


class Ads extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { findAds, companyID, findBrands } = this.props;

    findAds(companyID);
    findBrands();
  }

  handleDelete(id) {
    const { isDeleteLoading, deleteAd } = this.props;

    if (isDeleteLoading) return;
    deleteAd(id);
  }

  render() {
    const {
      ads,
      brands,
      categories,
      findCategories,
      createAd,
      isCreateLoading,
      updateAd,
      isUpdateLoading,
      companyID,
      canUserDelete,
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <AddAdModal
            createAd={createAd}
            isCreateLoading={isCreateLoading}
            companyID={companyID}
            brands={brands}
            categories={categories}
            findCategories={findCategories}
          />
        </div>
        <div className={styles.container}>
          {ads
            ? <List
              items={ads}
              handleDelete={this.handleDelete}
              canUserDelete={canUserDelete}
            ><EditAdModal
              updateAd={updateAd}
              categories={categories}
              isUpdateLoading={isUpdateLoading}
            /></List>
            : 'Loading...'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  companyID: ownProps.params.companyID,
  ads: getCurrentCompanyAds(ownProps.params.companyID)(state),
  brands: getBrandSelectOptions(state),
  categories: getCategorySelectOptions(state),
  canUserDelete: getCanUserDelete(state),
  isDeleteLoading: state.store.getIn(['isLoading', 'DELETE']),
  isCreateLoading: state.store.getIn(['isLoading', 'CREATE']),
  isUpdateLoading: state.store.getIn(['isLoading', 'UPDATE']),
});

const mapDispatchToProps = (dispatch) => ({
  updateAd: (id, data) => dispatch(actions.updateRecord('ad', id, data)),
  deleteAd: (id) => dispatch(actions.deleteRecord('ad', 'ads', id)),
  findAds: (companyID) => dispatch(
    actions.fetchRelated('company', companyID, 'ads', 'ad')
  ),
  findBrands: () => dispatch(actions.findRecords('brand')),
  findCategories: (brandId) => dispatch(
    actions.fetchRelated('brand', brandId, 'categories', 'category')
  ),
  createAd: ({
    brand,
    brandId,
    image,
    url,
    start,
    end,
    priority,
    categories,
    companyID,
  }) => dispatch(actions.createRecord('ad', {
    brand,
    brandId,
    image,
    url,
    start,
    end,
    priority,
    categories,
    company: companyID,
  })),
});

Ads.propTypes = {
  ads: PropTypes.object,
  brands: PropTypes.array,
  categories: PropTypes.array,
  companyID: PropTypes.string,
  findAds: PropTypes.func,
  findBrands: PropTypes.func,
  findCategories: PropTypes.func,
  isDeleteLoading: PropTypes.bool,
  deleteAd: PropTypes.func,
  isCreateLoading: PropTypes.bool,
  createAd: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
  updateAd: PropTypes.func,
  canUserDelete: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Ads);
