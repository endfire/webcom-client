import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'paintcan';
import { List, EditCategoryModal, AddCategoryModal } from './components';
import { getCurrentBrand, getCurrentBrandCategories } from 'selectors/adminBrands';
import { getCanUserDelete } from 'selectors/admin';
import { getIsCreateLoading, getIsUpdateLoading, getIsDeleteLoading } from 'selectors/loading';
import * as actions from 'actions/store';
import styles from './styles.scss';

const BrandOBG = ({
  brand,
  categories,
  initializeOBG,
  uninitializeOBG,
  canUserDelete,
  createCategory,
  updateCategory,
  deleteCategory,
  isCreateLoading,
  isUpdateLoading,
  isDeleteLoading,
}) => {
  const handleDelete = (id) => {
    if (isDeleteLoading || !canUserDelete) return;

    deleteCategory(id);
  };

  const obgUninitialized = (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Button onClick={initializeOBG} color="success">Initialize {brand.get('name')} OBG</Button>
      </div>
    </div>
  );

  const obgInitialized = (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <AddCategoryModal
          createCategory={createCategory}
          isCreateLoading={isCreateLoading}
        /> &nbsp;
        <Button onClick={uninitializeOBG} color="success">Uninitialize OBG</Button>
      </div>
      <div className={styles.container}>
        {categories
          ? <List
            items={categories}
            handleDelete={handleDelete}
            canUserDelete={canUserDelete}
          ><EditCategoryModal
            updateCategory={updateCategory}
            isUpdateLoading={isUpdateLoading}
          /></List>
          : 'Loading...'}
      </div>
    </div>
  );

  return brand.get('obg') ? obgInitialized : obgUninitialized;
};

const mapStateToProps = (state, ownProps) => ({
  brand: getCurrentBrand(ownProps.params.brandID)(state),
  categories: getCurrentBrandCategories(ownProps.params.brandID)(state),
  isCreateLoading: getIsCreateLoading(state),
  isUpdateLoading: getIsUpdateLoading(state),
  isDeleteLoading: getIsDeleteLoading(state),
  canUserDelete: getCanUserDelete(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateCategory: (id, data) => dispatch(actions.updateRecord('category', id, data)),
  deleteCategory: (id) => dispatch(actions.deleteRecord('category', 'categories', id)),
  createCategory: (name, heading) => dispatch(actions.createRecord('category', {
    name,
    heading,
    brand: ownProps.params.brandID,
    listings: [],
    ads: [],
  })),
  initializeOBG: () => dispatch(actions.updateRecord('brand', ownProps.params.brandID, {
    obg: true,
  })),
  uninitializeOBG: () => dispatch(actions.updateRecord('brand', ownProps.params.brandID, {
    obg: false,
  })),
});

BrandOBG.propTypes = {
  brand: PropTypes.object,
  categories: PropTypes.object,
  initializeOBG: PropTypes.func,
  uninitializeOBG: PropTypes.func,
  createCategory: PropTypes.func,
  updateCategory: PropTypes.func,
  deleteCategory: PropTypes.func,
  canUserDelete: PropTypes.bool,
  isCreateLoading: PropTypes.bool,
  isUpdateLoading: PropTypes.bool,
  isDeleteLoading: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BrandOBG);
