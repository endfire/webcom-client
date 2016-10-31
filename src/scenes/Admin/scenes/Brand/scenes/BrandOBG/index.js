import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'paintcan';
import { List, EditCategoryModal, AddCategoryModal, EditOBGModal } from './components';
import { getCurrentBrand, getCurrentBrandCategories } from 'selectors/adminBrands';
import { getCanUserDelete } from 'selectors/admin';
import { getIsCreateLoading, getIsUpdateLoading, getIsDeleteLoading } from 'selectors/loading';
import * as actions from 'actions/store';
import styles from './styles.scss';

class BrandOBG extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      brandID: props.params.brandID,
    };

    this.incrementCounter = this.incrementCounter.bind(this);
    this.obgUninitialized = this.obgUninitialized.bind(this);
    this.obgInitialized = this.obgInitialized.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  incrementCounter() {
    let { counter } = this.state;
    counter += 1000;
    this.setState({ counter });
  }

  handleDelete(id) {
    const { isDeleteLoading, canUserDelete, deleteCategory } = this.props;
    if (isDeleteLoading || !canUserDelete) return;

    deleteCategory(id);
  }

  obgUninitialized() {
    const { initializeOBG, brand } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Button onClick={initializeOBG} color="success">
            Initialize {brand.get('name')} OBG
          </Button>
        </div>
      </div>
    );
  }

  obgInitialized() {
    const {
      createCategory,
      isCreateLoading,
      brand,
      updateOBG,
      isUpdateLoading,
      uninitializeOBG,
      categories,
      canUserDelete,
      updateCategory,
    } = this.props;

    const {
      handleDelete,
      incrementCounter,
    } = this;

    const { counter, brandID } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <AddCategoryModal
            createCategory={createCategory}
            isCreateLoading={isCreateLoading}
          /> &nbsp;
          <EditOBGModal
            OBG={brand}
            updateOBG={updateOBG}
            isUpdateLoading={isUpdateLoading}
          /> &nbsp;
          <Link to={`/obg/${brandID}`}><Button>To OBG</Button></Link> &nbsp;
          <Button onClick={uninitializeOBG} color="success">Uninitialize OBG</Button>
        </div>
        <p>
          Note: Download counter of '0' will download the first 1,000.
          Incrementing the counter will download the next 1,000.
        </p>
        <div className={styles.download}>
          <Button onClick={incrementCounter} color="success">
            Increment counter: {counter}
          </Button> &nbsp;
          <a
            href={`http://webcom-server.herokuapp.com/download/brand/${brandID}?counter=${counter}`}
            target="_blank"
            className={styles.link}
          >
            <Button onClick="" color="success">
              Download industry
            </Button>
          </a>
        </div>
        <div className={styles.container}>
          {categories
            ? <List
              items={categories.sortBy(category => category.get('heading'))}
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
  }

  render() {
    const { brand } = this.props;
    return brand.get('obg') ? this.obgInitialized() : this.obgUninitialized();
  }
}

const mapStateToProps = (state, ownProps) => ({
  brand: getCurrentBrand(ownProps.params.brandID)(state),
  categories: getCurrentBrandCategories(ownProps.params.brandID)(state),
  isCreateLoading: getIsCreateLoading(state),
  isUpdateLoading: getIsUpdateLoading(state),
  isDeleteLoading: getIsDeleteLoading(state),
  canUserDelete: getCanUserDelete(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateOBG: (id, data) => dispatch(actions.updateRecord('brand', id, data)),
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
  params: PropTypes.object,
  brand: PropTypes.object,
  categories: PropTypes.object,
  initializeOBG: PropTypes.func,
  uninitializeOBG: PropTypes.func,
  updateOBG: PropTypes.func,
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
