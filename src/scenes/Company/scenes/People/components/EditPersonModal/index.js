import React, { PropTypes, Component } from 'react';
import { Button, Card, Container, Row, Col, withModal, ButtonGroup } from 'paintcan';
import Select from 'react-select';

const h3Style = {
  cursor: 'pointer',
  color: 'blue',
};

const EditPersonModal = withModal(
  ({ isOpen, openModal, item }) => (
    <h3 active={isOpen} onClick={openModal} style={h3Style}>
      {item.get('name')}
    </h3>
  ),
  ({ closeModal, item, updatePerson, isUpdateLoading, jobSelectOptions }) => (
    <EditPersonDialog
      closeModal={closeModal}
      person={item}
      updatePerson={updatePerson}
      isUpdateLoading={isUpdateLoading}
      jobSelectOptions={jobSelectOptions}
    />
  ),
);

class EditPersonDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.person.get('name'),
      email: props.person.get('email'),
      phone: props.person.get('phone'),
      job: props.person.get('job'),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isUpdateLoading, updatePerson, closeModal } = this.props;
    const id = this.props.person.get('id');
    const { name, email, phone, job } = this.state;

    if (isUpdateLoading) return;

    updatePerson(id, {
      name,
      email,
      phone,
      job,
    });
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
    const { person, closeModal, jobSelectOptions } = this.props;

    return (
      <Container fluid>
        <Row align={{ xs: 'center' }}>
          <Col size={{ xs: 10, lg: 4 }} align={{ xs: 'start' }}>
            <Card>
              <h3>Edit {person.get('name')}</h3>
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <label htmlFor="name">Name</label><br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    value={this.state.name}
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

EditPersonDialog.propTypes = {
  closeModal: PropTypes.func,
  updatePerson: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
  person: PropTypes.object,
  jobSelectOptions: PropTypes.array,
};

export default EditPersonModal;
