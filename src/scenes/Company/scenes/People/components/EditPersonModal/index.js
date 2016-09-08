import React, { PropTypes, Component } from 'react';
import { Button, withModal, ButtonGroup } from 'paintcan';
import Select from 'react-select';
import { ModalDialog } from 'components';
import listItem from 'styles/listItem';

const EditPersonModal = withModal(
  ({ isOpen, openModal, item }) => (
    <p active={isOpen} onClick={openModal} style={listItem}>
      {item.get('name')}
    </p>
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
      <ModalDialog title={`Edit ${person.get('name')}`} size="sm" closeModal={closeModal}>
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
      </ModalDialog>
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
