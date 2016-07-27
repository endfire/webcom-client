import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal } from 'paintcan';
import { connect } from 'react-redux';
import { UPDATE_REQUEST } from '../../../../../../../../../../actionTypes';

const EditUserModal = withModal(
  ({ isOpen, openModal, user }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      {user.name}
    </Button>
  ),
  ({ closeModal, user, updateUser, isUpdateLoading }) => (
    <EditUserDialog
      closeModal={closeModal}
      user={user}
      updateUser={updateUser}
      isUpdateLoading={isUpdateLoading}
    />
  ),
);

class EditUserDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.user.name,
      email: props.user.email,
      role: props.user.role,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { isUpdateLoading, updateUser, closeModal, user: { id } } = this.props;
    const { name, email, role } = this.state;

    if (isUpdateLoading) return;

    updateUser(id, {
      name,
      email,
      role,
    });
    closeModal();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const { user, closeModal } = this.props;

    return (
      // this could be a presentational component that is a sibling in this 'components' folder
      <Container fluid>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
            <Card>
              <h3>Edit {user.name}</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={this.state.name}
                /><br />
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={this.state.email}
                /><br />
                <label htmlFor="role">Role</label>
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
  isUpdateLoading: state.store.isLoading.UPDATE,
});

// use bound action creators?
const mapDispatchToProps = (dispatch) => ({
  updateUser: (id, data) => dispatch({
    type: UPDATE_REQUEST,
    payload: {
      type: 'user',
      id,
      data,
    },
  }),
});

EditUserDialog.propTypes = {
  closeModal: PropTypes.func,
  updateUser: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
  user: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUserModal);
