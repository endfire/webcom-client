import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { AddBrandModal, List } from './components';
import { getCanUserDelete } from 'selectors/admin';
import * as actions from 'actions/store';
import styles from './styles.scss';

class Brands extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.findBrands();
  }

  handleDelete(id) {
    const { isDeleteLoading, deleteBrand, canUserDelete } = this.props;

    if (isDeleteLoading || !canUserDelete) return;

    deleteBrand(id);
  }

  render() {
    const { brands, createBrand, isCreateLoading, canUserDelete } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <AddBrandModal
            createBrand={createBrand}
            isCreateLoading={isCreateLoading}
          />
        </div>
        <div className={styles.container}>
          {brands
            ? <List
              items={brands}
              handleDelete={this.handleDelete}
              canUserDelete={canUserDelete}
            />
            : 'Loading...'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  brands: state.store.getIn(['entities', 'brands']),
  isDeleteLoading: state.store.getIn(['isLoading', 'DELETE']),
  isCreateLoading: state.store.getIn(['isLoading', 'CREATE']),
  canUserDelete: getCanUserDelete(state),
});

const mapDispatchToProps = (dispatch) => ({
  findBrands: () => dispatch(actions.findRecords('brand')),
  deleteBrand: (id) => dispatch(actions.deleteRecord('brand', 'brands', id)),
  createBrand: (name, image) => dispatch(actions.createRecord('brand', {
    name,
    image,
    forms: [],
    categories: [],
  })),
});

Brands.propTypes = {
  brands: PropTypes.object,
  canUserDelete: PropTypes.bool,
  isDeleteLoading: PropTypes.bool,
  isCreateLoading: PropTypes.bool,
  findBrands: PropTypes.func,
  deleteBrand: PropTypes.func,
  createBrand: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Brands);
