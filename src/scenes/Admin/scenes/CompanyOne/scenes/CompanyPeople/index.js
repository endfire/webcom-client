import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import List from '../../components/List';
import { AddPersonModal, EditPersonModal } from './components';
import { getCanUserDelete } from 'selectors/admin';
import { getCurrentCompany, getCurrentCompanyPeople } from 'selectors/adminCompanies';
import { getIsDeleteLoading, getIsCreateLoading, getIsUpdateLoading } from 'selectors/loading';
import * as actions from 'actions/store';

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
      <Container fluid><br />
        <Row>
          <Col size={{ xs: 4 }} align={{ xs: 'left' }}>
            <AddPersonModal
              createPerson={createPerson}
              isCreateLoading={isCreateLoading}
              companyID={companyID}
            /><br /><br /><br />
            {people
              ? <List
                items={people}
                handleDelete={this.handleDelete}
                canUserDelete={canUserDelete}
              ><EditPersonModal
                updatePerson={updatePerson}
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
  findPeople: (companyID) => dispatch(actions.findRecords('person', { company: companyID })),
  createPerson: (name, email, phone, job, companyID) => dispatch(actions.createRecord('person', {
    name,
    email,
    phone,
    job,
    company: companyID,
  })),
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