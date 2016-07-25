/* eslint-disable no-class-assign */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import List from './components/List';
import AddPersonModal from './components/AddPersonModal';
import { FIND_REQUEST, DELETE_REQUEST } from '../../../../actionTypes';

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
    findPeople();
  }

  handleDelete(id) {
      // const { isDeleteLoading, deletePerson } = this.props;
    const { isDeleteLoading } = this.props;

    if (isDeleteLoading) return;

    console.log(`Delete person ${id}`);
    // FIXME: need to fix saga...
    // deletePerson(id); // dispatch action
  }

  render() {
    const { people } = this.props;

    return (
      <Container fluid><br />
        <Row>
          <Col size={{ xs: 4 }} align={{ xs: 'left' }}>
            <AddPersonModal /><br /><br /><br />
            {people ? <List people={people} handleDelete={this.handleDelete} /> : 'Loading...'}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  people: state.store.entities.people,
  isDeleteLoading: state.store.isLoading.DELETE,
});

const mapDispatchToProps = (dispatch) => ({
  findPeople: () => dispatch({
    type: FIND_REQUEST,
    payload: {
      type: 'person',
    },
  }),
  deletePerson: (id) => dispatch({
    type: DELETE_REQUEST,
    payload: {
      type: 'person',
      id,
    },
  }),
});

People.propTypes = {
  people: PropTypes.object,
  findPeople: PropTypes.func,
  isDeleteLoading: PropTypes.bool,
  deletePerson: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(People);
