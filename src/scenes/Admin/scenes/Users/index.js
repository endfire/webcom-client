import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import List from './components/List';
import AddUserModal from './components/AddUserModal';
import { FIND_REQUEST, DELETE_REQUEST } from '../../../../actionTypes';

class Users extends Component {
  constructor(props) {
    super(props);

    this.find = this.find.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.find();
  }

  find() {
    const { findUsers } = this.props;
    findUsers();
  }

  handleDelete(id) {
      // const { isDeleteLoading, deleteUser } = this.props;
    const { isDeleteLoading } = this.props;

    if (isDeleteLoading) return;

    console.log(`Delete user ${id}`);
    // FIXME: need to fix saga...
    // deleteUser(id); // dispatch action
  }

  render() {
    const { users } = this.props;

    return (
      <Container fluid><br />
        <Row>
          <Col size={{ xs: 4 }} align={{ xs: 'left' }}>
            <AddUserModal /><br /><br /><br />
            {users ? <List items={users} handleDelete={this.handleDelete} /> : 'Loading...'}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.store.entities.users,
  isDeleteLoading: state.store.isLoading.DELETE,
});

const mapDispatchToProps = (dispatch) => ({
  findUsers: () => dispatch({
    type: FIND_REQUEST,
    payload: {
      type: 'user',
    },
  }),
  deleteUser: (id) => dispatch({
    type: DELETE_REQUEST,
    payload: {
      type: 'user',
      id,
    },
  }),
});

Users.propTypes = {
  users: PropTypes.object,
  findUsers: PropTypes.func,
  isDeleteLoading: PropTypes.bool,
  deleteUser: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
