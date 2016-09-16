import React, { PropTypes, Component } from 'react';
import { Button, ButtonGroup, withModal } from 'paintcan';
import { ModalDialog } from 'components';

const AddPersonModal = withModal(
  ({ isOpen, openModal }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      Add a new person
    </Button>
  ),
  ({ closeModal, createPerson, isCreateLoading, companyID }) => (
    <AddPersonDialog
      closeModal={closeModal}
      createPerson={createPerson}
      isCreateLoading={isCreateLoading}
      companyID={companyID}
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

  render() {
    const { handleSubmit, handleChange } = this;
    const { closeModal } = this.props;

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
            <select id="job" name="job" onChange={handleChange} value={this.state.job}>
              <option value="Admin/HR/Legal">Admin/HR/Legal</option>
              <option value="Finance/Purchasing">Finance/Purchasing</option>
              <option value="Gen/Corp Management">Gen/Corp Management</option>
              <option value="IT/MIS">IT/MIS</option>
              <option value="Nurse/NP">Nurse/NP</option>
              <option value="Physician/MP">Physician/MP</option>
              <option value="RD/Engineering/Tech">RD/Engineering/Tech</option>
              <option value="Sales/Marketing/Customer Service">
                Sales/Marketing/Customer Service
              </option>
            </select>
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
};

export default AddPersonModal;
