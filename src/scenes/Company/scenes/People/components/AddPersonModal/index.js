import React, { PropTypes, Component } from 'react';
import { Button, withModal, ButtonGroup } from 'paintcan';
import Select from 'react-select';
import { ModalDialog } from 'components';

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
      title: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isCreateLoading, createPerson, closeModal, companyID } = this.props;
    const { name, email, phone, job, title } = this.state;

    if (isCreateLoading) return;

    createPerson(name, email, phone, job, title, companyID);
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
      <ModalDialog title="Add a new person" size="sm" closeModal={closeModal}>
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
            <label htmlFor="title">Job Title</label><br />
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              value={this.state.title}
              placeholder="VP of Marketing"
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
            <label htmlFor="job">Job Functions</label><br />
            <Select
              name="job"
              value={this.state.job}
              options={jobSelectOptions}
              onChange={handleSelectChange}
              placeholder="Please select job functions"
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
      </ModalDialog>
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
