import React, { PropTypes, Component } from 'react';
import { Button, ButtonGroup, withModal } from 'paintcan';
import { connect } from 'react-redux';
import * as actions from 'actions/store';
import { ModalDialog } from 'components';

const AddUserModal = withModal(
  ({ isOpen, openModal }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      Add a new user
    </Button>
  ),
  ({ closeModal, createUser, isCreateLoading }) => (
    <AddUserDialog
      closeModal={closeModal}
      createUser={createUser}
      isCreateLoading={isCreateLoading}
    />
  ),
);

class AddUserDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      role: '',
      password: '',
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    const { isCreateLoading, createUser, closeModal } = this.props;

    if (isCreateLoading) return;

    const { name, email, role, password } = this.state;
    createUser(name, email, role, password);
    closeModal();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { submitHandler, handleChange } = this;
    const { closeModal } = this.props;

    return (
      <ModalDialog title="Add a new user" size="sm" closeModal={closeModal}>
        <form onSubmit={submitHandler}>
          <fieldset>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={this.state.name}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              value={this.state.email}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              onChange={handleChange}
              value={this.state.password}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="role">Role</label>
            <select id="role" name="role" onChange={handleChange} value={this.state.role}>
              <option value="1">No restrictions</option>
              <option value="2">Cannot delete</option>
              <option value="3">Cannot delete, add users, or access OBG</option>
            </select>
          </fieldset>
          <fieldset>
            <ButtonGroup spaced>
              <Button onClick={closeModal} color="danger">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </ButtonGroup>
          </fieldset>
        </form>
      </ModalDialog>
    );
  }
}

const mapStateToProps = (state) => ({
  isCreateLoading: state.store.getIn(['isLoading', 'CREATE']),
});

const mapDispatchToProps = (dispatch) => ({
  createUser: (name, email, role, password) => dispatch(actions.createRecord('user', {
    name,
    email,
    role,
    password,
  })),
});

AddUserDialog.propTypes = {
  closeModal: PropTypes.func,
  createUser: PropTypes.func,
  isCreateLoading: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUserModal);
