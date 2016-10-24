import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import List from '../../components/List';
import { AddPersonModal, EditPersonModal } from './components';
import { getCanUserDelete } from 'selectors/admin';
import { getCurrentCompany, getCurrentCompanyPeople } from 'selectors/adminCompanies';
import { getIsDeleteLoading, getIsCreateLoading, getIsUpdateLoading } from 'selectors/loading';
import * as actions from 'actions/store';
import styles from './styles.scss';

class CompanyPeople extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { findPeople, params: { companyID } } = this.props;

    findPeople(companyID);
  }

  handleDelete(id) {
    const { isDeleteLoading, deletePerson } = this.props;

    if (isDeleteLoading) return;

    deletePerson(id);
  }

  render() {
    const {
      people,
      createPerson,
      isCreateLoading,
      updatePerson,
      isUpdateLoading,
      canUserDelete,
      params: { companyID },
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <AddPersonModal
            createPerson={createPerson}
            isCreateLoading={isCreateLoading}
            companyID={companyID}
          />
        </div>
        <div className={styles.container}>
          {!people.isEmpty()
            ? <List
              items={people}
              handleDelete={this.handleDelete}
              canUserDelete={canUserDelete}
            ><EditPersonModal
              updatePerson={updatePerson}
              isUpdateLoading={isUpdateLoading}
            /></List>
            : <div className={styles.wrapperLoading}>
              <div>
                  No people
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  company: getCurrentCompany(ownProps.params.companyID)(state),
  people: getCurrentCompanyPeople(ownProps.params.companyID)(state),
  canUserDelete: getCanUserDelete(state),
  isDeleteLoading: getIsDeleteLoading(state),
  isCreateLoading: getIsCreateLoading(state),
  isUpdateLoading: getIsUpdateLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  updatePerson: (id, data) => dispatch(actions.updateRecord('person', id, data)),
  deletePerson: (id) => dispatch(actions.deleteRecord('person', 'people', id)),
  findPeople: (companyID) => dispatch(
    actions.fetchRelated('company', companyID, 'people', 'person')
  ),
  createPerson: (name, email, phone, job, title, companyID) => dispatch(
    actions.createRecord('person', {
      name,
      email,
      phone,
      job,
      title,
      company: companyID,
    })
  ),
});

CompanyPeople.propTypes = {
  params: PropTypes.object,
  canUserDelete: PropTypes.bool,
  people: PropTypes.object,
  company: PropTypes.object,
  findPeople: PropTypes.func,
  isDeleteLoading: PropTypes.bool,
  deletePerson: PropTypes.func,
  isCreateLoading: PropTypes.bool,
  createPerson: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
  updatePerson: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyPeople);
