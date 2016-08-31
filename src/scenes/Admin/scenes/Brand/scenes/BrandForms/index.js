import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { AddFormModal, List } from './components';
import { getCanUserDelete, getCurrentBrandForms } from 'selectors/admin';
import * as actions from 'actions/store';
import styles from './styles.scss';

class BrandForms extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { findForms, params: { brandID } } = this.props;

    findForms(brandID);
  }

  handleDelete(id) {
    const { isDeleteLoading, deleteForm, canUserDelete } = this.props;

    if (isDeleteLoading || !canUserDelete) return;

    deleteForm(id);
  }

  render() {
    const { forms, createForm, isCreateLoading, canUserDelete, params: { brandID } } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <AddFormModal
            createForm={createForm}
            isCreateLoading={isCreateLoading}
          />
        </div>
        <div className={styles.container}>
          {forms
            ? <List
              items={forms}
              brandID={brandID}
              handleDelete={this.handleDelete}
              canUserDelete={canUserDelete}
            />
            : 'Loading...'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  forms: getCurrentBrandForms(ownProps.params.brandID)(state),
  isDeleteLoading: state.store.getIn(['isLoading', 'DELETE']),
  isCreateLoading: state.store.getIn(['isLoading', 'CREATE']),
  canUserDelete: getCanUserDelete(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteForm: (id) => dispatch(actions.deleteRecord('form', 'forms', id)),
  findForms: (brandID) => dispatch(actions.findRecords('form', {
    brand: {
      id: brandID,
    },
  })),
  createForm: (name) => dispatch(actions.createRecord('form', {
    name,
    published: false,
    brand: ownProps.params.brandID,
    fields: [],
    submissions: [],
  })),
});

BrandForms.propTypes = {
  params: PropTypes.object,
  forms: PropTypes.object,
  canUserDelete: PropTypes.bool,
  isDeleteLoading: PropTypes.bool,
  isCreateLoading: PropTypes.bool,
  findForms: PropTypes.func,
  deleteForm: PropTypes.func,
  createForm: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BrandForms);
