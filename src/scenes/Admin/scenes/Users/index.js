import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import { List, AddUserModal } from './components';
import { FIND_REQUEST, DELETE_REQUEST } from '../../../../actionTypes';

class Users extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.findUsers();
  }

  handleDelete(id) {
    const { isDeleteLoading, deleteUser } = this.props;

    if (isDeleteLoading) return;

    deleteUser(id);
  }

  render() {
    const { users } = this.props;

    return (
      <Container fluid><br />
        <Row>
          <Col>
            <AddUserModal /><br /><br /><br />
            {users ? <List items={users} handleDelete={this.handleDelete} /> : 'Loading...'}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.store.getIn(['entities', 'users']),
  isDeleteLoading: state.store.getIn(['isLoading', 'DELETE']),
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
  isDeleteLoading: PropTypes.bool,
  findUsers: PropTypes.func,
  deleteUser: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
