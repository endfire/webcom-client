import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import List from '../../components/List';
import { AddPersonModal, EditPersonModal } from './components';
import { getSessionID, getCompanyPeople } from 'selectors/company';
import { getIsDeleteLoading, getIsCreateLoading, getIsUpdateLoading } from 'selectors/loading';
import * as actions from 'actions/store';
import styles from './styles.scss';

class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobSelectOptions: [
        {
          label: 'ADMIN/HR/LEGAL',
          value: 'ADMIN/HR/LEGAL',
        },
        {
          label: 'FIN/PURCH',
          value: 'FIN/PURCH',
        },
        {
          label: 'GEN/CORP MGMT',
          value: 'GEN/CORP MGMT',
        },
        {
          label: 'IT/MIS',
          value: 'IT/MIS',
        },
        {
          label: 'NURSE/NP',
          value: 'NURSE/NP',
        },
        {
          label: 'PHYSICIAN/MP',
          value: 'PHYSICIAN/MP',
        },
        {
          label: 'RD/ENGRG/TECH',
          value: 'RD/ENGRG/TECH',
        },
        {
          label: 'SALES/MKTG/CUS SVC',
          value: 'SALES/MKTG/CUS SVC',
        },
      ],
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { findPeople, companyID } = this.props;

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
      companyID,
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <AddPersonModal
            createPerson={createPerson}
            isCreateLoading={isCreateLoading}
            companyID={companyID}
            jobSelectOptions={this.state.jobSelectOptions}
          />
        </div>
        <div className={styles.container}>
          {people
            ? <List
              items={people}
              handleDelete={this.handleDelete}
            ><EditPersonModal
              updatePerson={updatePerson}
              isUpdateLoading={isUpdateLoading}
              jobSelectOptions={this.state.jobSelectOptions}
            /></List>
            : 'Loading...'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  companyID: getSessionID(state),
  people: getCompanyPeople(state),
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

People.propTypes = {
  people: PropTypes.object,
  companyID: PropTypes.string,
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
)(People);
