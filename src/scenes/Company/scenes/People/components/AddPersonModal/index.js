import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal, ButtonGroup } from 'paintcan';
import Select from 'react-select';

const AddPersonModal = withModal(
  ({ isOpen, openModal }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      Add a new person
    </Button>
  ),
  ({ closeModal, createPerson, isCreateLoading, companyID, jobSelectOptions }) => (
    <AddPersonDialog
      closeModal={closeModal}
      createPerson={createPerson}
      isCreateLoading={isCreateLoading}
      companyID={companyID}
      jobSelectOptions={jobSelectOptions}
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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isCreateLoading, createPerson, closeModal, companyID } = this.props;
    const { name, email, phone, job } = this.state;

    if (isCreateLoading) return;

    createPerson(name, email, phone, job, companyID);
    closeModal();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSelectChange(val) {
    if (val) {
      this.setState({ job: val.value });
    } else {
      this.setState({ job: '' });
    }
  }

  render() {
    const { handleSubmit, handleChange, handleSelectChange } = this;
    const { closeModal, jobSelectOptions } = this.props;

    return (
      <Container fluid>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
            <Card>
              <h3>Add new person</h3>
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <label htmlFor="name">Name</label><br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    value={this.state.name}
                    placeholder="John Doe"
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="email">Email</label><br />
                  <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={this.state.email}
                    placeholder="john@company.com"
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="phone">Phone Number</label><br />
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    value={this.state.phone}
                    placeholder="303-123-4567"
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="job">Job Title</label><br />
                  <Select
                    name="job"
                    value={this.state.job}
                    options={jobSelectOptions}
                    onChange={handleSelectChange}
                    placeholder="Please select a job title"
                  />
                </fieldset>
                <fieldset>
                  <ButtonGroup spaced>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                    <Button type="button" color="danger" onClick={closeModal}>
                      Cancel
                    </Button>
                  </ButtonGroup>
                </fieldset>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

AddPersonDialog.propTypes = {
  closeModal: PropTypes.func,
  createPerson: PropTypes.func,
  isCreateLoading: PropTypes.bool,
  companyID: PropTypes.string,
  jobSelectOptions: PropTypes.array,
};

export default AddPersonModal;
