import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import List from '../../components/List';
import { AddAdModal, EditAdModal } from './components';
import { getCanUserDelete } from 'selectors/admin';
import * as actions from 'actions/store';
import { getCurrentCompanyAds } from 'selectors/adminCompanies';
import { getBrandSelectOptions, getCategorySelectOptions } from 'selectors/company';


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
      <Container fluid><br />
        <Row>
          <Col size={{ xs: 4 }} align={{ xs: 'left' }}>
            <AddAdModal
              createAd={createAd}
              isCreateLoading={isCreateLoading}
              companyID={companyID}
              brands={brands}
              categories={categories}
              findCategories={findCategories}
            /><br /><br /><br />
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
          </Col>
        </Row>
      </Container>
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
  createAd: ({ brand, brandId, categories, companyID }) =>
    dispatch(actions.createRecord('ad', {
      brand,
      brandId,
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
