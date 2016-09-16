import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { List, AddUserModal } from './components';
import { getCanUserDelete, getCanUserAddUsers } from 'selectors/admin';
import * as actions from 'actions/store';
import styles from './styles.scss';

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
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {canUserAddUsers && <AddUserModal />}
        </div>
        <p>
          Role(1) - User has no restrictions.
        </p>
        <p>
          Role(2) - User cannot delete.
        </p>
        <p>
          Role(3) - User cannot delete, access OBG, or create users.
        </p>
        <div className={styles.container}>
          {users ? list : 'Loading...'}
        </div>
      </div>
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
