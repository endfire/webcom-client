import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import List from '../../components/List';
import { AddPersonModal, EditPersonModal } from './components';
import {
  FIND_REQUEST,
  DELETE_REQUEST,
  CREATE_REQUEST,
  UPDATE_REQUEST,
} from '../../../../actionTypes';

class People extends Component {
  constructor(props) {
    super(props);

    this.find = this.find.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.find();
  }

  find() {
    const { findPeople } = this.props;
    findPeople('1'); // FIXME: Need to access company ID via session
  }

  handleDelete(id) {
    const { isDeleteLoading, deletePerson } = this.props;

    if (isDeleteLoading) return;

    deletePerson(id);
  }

  render() {
    const { people, createPerson, isCreateLoading, updatePerson, isUpdateLoading } = this.props;

    return (
      <Container fluid><br />
        <Row>
          <Col size={{ xs: 4 }} align={{ xs: 'left' }}>
            <AddPersonModal
              createPerson={createPerson}
              isCreateLoading={isCreateLoading}
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
  people: state.store.entities.people,
  isDeleteLoading: state.store.isLoading.DELETE,
  isCreateLoading: state.store.isLoading.CREATE,
  isUpdateLoading: state.store.isLoading.UPDATE,
});

const mapDispatchToProps = (dispatch) => ({
  findPeople: (company) => dispatch({
    type: FIND_REQUEST,
    payload: {
      type: 'person',
      filters: {
        company,
      },
    },
  }),
  deletePerson: (id) => dispatch({
    type: DELETE_REQUEST,
    payload: {
      type: 'person',
      id,
    },
  }),
  createPerson: (name, email, phone, job) => dispatch({
    type: CREATE_REQUEST,
    payload: {
      type: 'person',
      record: {
        name,
        email,
        phone,
        job,
      },
    },
  }),
  updatePerson: (id, data) => dispatch({
    type: UPDATE_REQUEST,
    payload: {
      type: 'person',
      id,
      data,
    },
  }),
});

People.propTypes = {
  people: PropTypes.object,
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
