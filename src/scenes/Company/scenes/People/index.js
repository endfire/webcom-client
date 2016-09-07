import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import List from '../../components/List';
import { AddPersonModal, EditPersonModal } from './components';
import { getSessionID, getCompanyPeople } from 'selectors/company';
import { getIsDeleteLoading, getIsCreateLoading, getIsUpdateLoading } from 'selectors/loading';
import * as actions from 'actions/store';

class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobSelectOptions: [
        {
          label: 'Admin/HR/Legal',
          value: 'Admin/HR/Legal',
        },
        {
          label: 'Finance/Purchasing',
          value: 'Finance/Purchasing',
        },
        {
          label: 'Gen/Corp Management',
          value: 'Gen/Corp Management',
        },
        {
          label: 'IT/MIS',
          value: 'IT/MIS',
        },
        {
          label: 'Nurse/NP',
          value: 'Nurse/NP',
        },
        {
          label: 'Physician/MP',
          value: 'Physician/MP',
        },
        {
          label: 'RD/Engineering/Tech',
          value: 'RD/Engineering/Tech',
        },
        {
          label: 'Sales/Marketing/Customer Service',
          value: 'Sales/Marketing/Customer Service',
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
      <Container fluid><br />
        <Row>
          <Col size={{ xs: 4 }} align={{ xs: 'left' }}>
            <AddPersonModal
              createPerson={createPerson}
              isCreateLoading={isCreateLoading}
              companyID={companyID}
              jobSelectOptions={this.state.jobSelectOptions}
            /><br /><br /><br />
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
          </Col>
        </Row>
      </Container>
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
  findPeople: (companyID) => dispatch(actions.findRecords('person', { company: companyID })),
  createPerson: (name, email, phone, job, companyID) => dispatch(actions.createRecord('person', {
    name,
    email,
    phone,
    job,
    company: companyID,
  })),
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
