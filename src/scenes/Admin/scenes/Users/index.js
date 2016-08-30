import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'paintcan';
import { List, AddUserModal } from './components';
import { getCanUserDelete, getCanUserAddUsers } from 'selectors/admin';
import * as actions from 'actions/store';

class Users extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.findUsers();
  }

  handleDelete(id) {
    const { isDeleteLoading, deleteUser, canUserDelete } = this.props;

    if (isDeleteLoading || !canUserDelete) return;

    deleteUser(id);
  }

  render() {
    const { users, canUserDelete, canUserAddUsers } = this.props;

    const list = (
      <List
        items={users}
        handleDelete={this.handleDelete}
        canUserDelete={canUserDelete}
      />
    );

    return (
      <Container fluid><br />
        <Row>
          <Col>
            {canUserAddUsers && <AddUserModal />}
            <br /><br /><br />
            {users ? list : 'Loading...'}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.store.getIn(['entities', 'users']),
  isDeleteLoading: state.store.getIn(['isLoading', 'DELETE']),
  canUserDelete: getCanUserDelete(state),
  canUserAddUsers: getCanUserAddUsers(state),
});

const mapDispatchToProps = (dispatch) => ({
  findUsers: () => dispatch(actions.findRecords('user')),
  deleteUser: (id) => dispatch(actions.deleteRecord('user', 'users', id)),
});

Users.propTypes = {
  users: PropTypes.object,
  canUserDelete: PropTypes.bool,
  canUserAddUsers: PropTypes.bool,
  isDeleteLoading: PropTypes.bool,
  findUsers: PropTypes.func,
  deleteUser: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
