import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal } from 'paintcan';
import { connect } from 'react-redux';
import * as types from 'constants/actionTypes';

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
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    const { isCreateLoading, createUser, closeModal } = this.props;

    if (isCreateLoading) return;

    const { name, email, role } = this.state;
    createUser(name, email, role);
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
      <Container fluid>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
            <Card>
              <h3>Add new user</h3>
              <form onSubmit={submitHandler}>
                <label htmlFor="name">Name</label><br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={this.state.name}
                /><br />
                <label htmlFor="email">Email</label><br />
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={this.state.email}
                /><br />
                <label htmlFor="role">Role</label><br />
                <input
                  type="text"
                  id="role"
                  name="role"
                  onChange={handleChange}
                  value={this.state.role}
                /><br />
                <input type="submit" value="Save Change" />
              </form>
              <Button onClick={closeModal}>
                Cancel
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isCreateLoading: state.store.getIn(['isLoading', 'CREATE']),
});

const mapDispatchToProps = (dispatch) => ({
  createUser: (name, email, role) => dispatch({
    type: types.CREATE_REQUEST,
    payload: {
      type: 'user',
      record: {
        name,
        email,
        role,
      },
    },
  }),
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
