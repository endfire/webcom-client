import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import List from '../../components/List';
import { AddPersonModal, EditPersonModal } from './components';
import { getSessionID } from 'selectors/company';
import * as actions from 'actions/store';

class People extends Component {
  constructor(props) {
    super(props);

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
            /><br /><br /><br />
            {people
              ? <List
                items={people}
                handleDelete={this.handleDelete}
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

const mapStateToProps = (state) => ({
  companyID: getSessionID(state),
  people: state.store.getIn(['entities', 'people']),
  isDeleteLoading: state.store.getIn(['isLoading', 'DELETE']),
  isCreateLoading: state.store.getIn(['isLoading', 'CREATE']),
  isUpdateLoading: state.store.getIn(['isLoading', 'UPDATE']),
});

const mapDispatchToProps = (dispatch) => ({
  updatePerson: (id, data) => dispatch(actions.updateRecord('person', id, data)),
  deletePerson: (id) => dispatch(actions.deleteRecord('person', 'people', id)),
  findPeople: (companyID) => dispatch(actions.findRecords('person', {
    company: companyID,
  })),
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
