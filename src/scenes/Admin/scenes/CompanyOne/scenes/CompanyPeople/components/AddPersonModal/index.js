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
      title: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
            <label htmlFor="job">Job Functions</label><br />
            <select id="job" name="job" onChange={handleChange} value={this.state.job}>
              <option value="ADMIN/HR/LEGAL">ADMIN/HR/LEGAL</option>
              <option value="FIN/PURCH">FIN/PURCH</option>
              <option value="GEN/CORP MGMT">GEN/CORP MGMT</option>
              <option value="IT/MIS">IT/MIS</option>
              <option value="NURSE/NP">NURSE/NP</option>
              <option value="PHYSICIAN/MP">PHYSICIAN/MP</option>
              <option value="RD/ENGRG/TECH">RD/ENGRG/TECH</option>
              <option value="SALES/MKTG/CUS SVC">
                SALES/MKTG/CUS SVC
              </option>
            </select>
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
