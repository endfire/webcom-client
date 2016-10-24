import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { AddFormModal, List } from './components';
import { getCanUserDelete } from 'selectors/admin';
import { getCurrentBrandForms } from 'selectors/adminBrands';
import { getIsCreateLoading, getIsUpdateLoading, getIsDeleteLoading } from 'selectors/loading';
import * as actions from 'actions/store';
import styles from './styles.scss';

class BrandForms extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    const { isDeleteLoading, deleteForm, canUserDelete } = this.props;

    if (isDeleteLoading || !canUserDelete) return;

    deleteForm(id);
  }

  render() {
    const {
      forms,
      createForm,
      isCreateLoading,
      canUserDelete,
      updateForm,
      isUpdateLoading,
      params: { brandID },
    } = this.props;

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
              updateForm={updateForm}
              isUpdateLoading={isUpdateLoading}
            />
            : 'Loading...'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  forms: getCurrentBrandForms(ownProps.params.brandID)(state),
  canUserDelete: getCanUserDelete(state),
  isCreateLoading: getIsCreateLoading(state),
  isUpdateLoading: getIsUpdateLoading(state),
  isDeleteLoading: getIsDeleteLoading(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteForm: (id) => dispatch(actions.deleteRecord('form', 'forms', id)),
  updateForm: (id, data) => dispatch(actions.updateRecord('form', id, data)),
  createForm: (name) => dispatch(actions.createRecord('form', {
    name,
    toggleHeading: '1',
    didPublish: false,
    recipientOne: 'marcv@webcomcommunications.com',
    recipientTwo: 'marshag@webcomcommunications.com',
    recipientThree: 'julieh@webcomcommunications.com',
    brand: ownProps.params.brandID,
    fields: [],
    submissions: [],
  })),
});

BrandForms.propTypes = {
  params: PropTypes.object,
  forms: PropTypes.object,
  canUserDelete: PropTypes.bool,
  isCreateLoading: PropTypes.bool,
  isUpdateLoading: PropTypes.bool,
  isDeleteLoading: PropTypes.bool,
  findForms: PropTypes.func,
  deleteForm: PropTypes.func,
  updateForm: PropTypes.func,
  createForm: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BrandForms);
