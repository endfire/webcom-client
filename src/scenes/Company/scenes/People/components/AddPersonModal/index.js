/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal } from 'paintcan';
import { connect } from 'react-redux';
import { CREATE_REQUEST } from '../../../../../../actionTypes';
import JobSelect from '../JobSelect';

const AddPersonModal = withModal(
  ({ isOpen, openModal }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      Add a new person
    </Button>
  ),
  ({ closeModal, createPerson, isCreateLoading }) => (
    <AddPersonDialog
      closeModal={closeModal}
      createPerson={createPerson}
      isCreateLoading={isCreateLoading}
    />
  ),
);

class AddPersonDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      job: '',
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.jobSelectHandler = this.jobSelectHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    const { isCreateLoading, createPerson, closeModal } = this.props;

    if (isCreateLoading) return;

    const { name, email, phone, job } = this.state;
    createPerson(name, email, phone, job);
    closeModal();
  }

  jobSelectHandler(item) {
    this.setState({ job: item.label });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { submitHandler, handleChange, jobSelectHandler } = this;
    const { closeModal } = this.props;

    return (
      <Container fluid>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
            <Card>
              <h3>Add new person</h3>
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
                <label htmlFor="phone">Phone Number</label><br />
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  value={this.state.phone}
                /><br />
                <label>Job Title</label>
                <input
                  type="text"
                  id="job"
                  name="job"
                  hidden
                  value={this.state.job}
                />
                <JobSelect jobSelectHandler={jobSelectHandler} /><br /><br />
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
  isCreateLoading: state.store.isLoading.CREATE,
});

const mapDispatchToProps = (dispatch) => ({
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
});

AddPersonDialog.propTypes = {
  closeModal: PropTypes.func,
  createPerson: PropTypes.func,
  isCreateLoading: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPersonModal);
