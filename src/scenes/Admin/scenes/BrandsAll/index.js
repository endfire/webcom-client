import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'paintcan';
import { Icon } from 'react-fa';
import { AddBrandModal, List } from './components';
import { getCanUserDelete } from 'selectors/admin';
import { getBrands } from 'selectors/adminBrands';
import { getIsDeleteLoading, getIsCreateLoading } from 'selectors/loading';
import * as actions from 'actions/store';
import styles from './styles.scss';

class Brands extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeleteEnabled: false,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggleDelete = this.handleToggleDelete.bind(this);
  }

  componentDidMount() {
    this.props.findBrands();
  }

  handleDelete(id) {
    const { isDeleteLoading, deleteBrand, canUserDelete } = this.props;

    if (isDeleteLoading || !canUserDelete) return;

    deleteBrand(id);
  }

  handleToggleDelete() {
    const { isDeleteEnabled } = this.state;

    this.setState({ isDeleteEnabled: !isDeleteEnabled });
  }

  render() {
    const { brands, createBrand, isCreateLoading, canUserDelete } = this.props;
    const { handleDelete, handleToggleDelete } = this;
    const { isDeleteEnabled } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <AddBrandModal
            createBrand={createBrand}
            isCreateLoading={isCreateLoading}
          /> &nbsp;
          <Button color="danger" onClick={handleToggleDelete}>
            <Icon name="warning" /> {isDeleteEnabled ? 'Disable deletion' : 'Enable deletion'}
          </Button>
        </div>
        <div className={styles.container}>
          {!brands.isEmpty()
            ? <List
              items={brands.sortBy(brand => brand.get('name'))}
              handleDelete={handleDelete}
              canUserDelete={canUserDelete}
              isDeleteEnabled={isDeleteEnabled}
            />
            : <div className={styles.wrapperLoading}>
              <div>
                  Loading...
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  brands: getBrands(state),
  canUserDelete: getCanUserDelete(state),
  isDeleteLoading: getIsDeleteLoading(state),
  isCreateLoading: getIsCreateLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  findBrands: () => dispatch(actions.findRecords('brand', {}, false)),
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
