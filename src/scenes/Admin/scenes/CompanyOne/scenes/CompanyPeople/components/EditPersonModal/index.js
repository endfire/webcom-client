import React, { PropTypes, Component } from 'react';
import { Button, ButtonGroup, withModal } from 'paintcan';
import { ModalDialog } from 'components';
import listItem from 'styles/listItem';

const EditPersonModal = withModal(
  ({ openModal, item }) => (
    <p onClick={openModal} style={listItem}>
      {item.get('name')}
    </p>
  ),
  ({ closeModal, item, updatePerson, isUpdateLoading }) => (
    <EditPersonDialog
      closeModal={closeModal}
      person={item}
      updatePerson={updatePerson}
      isUpdateLoading={isUpdateLoading}
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
      title: props.person.get('title'),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isUpdateLoading, updatePerson, closeModal } = this.props;
    const id = this.props.person.get('id');
    const { name, email, phone, job, title } = this.state;

    if (isUpdateLoading) return;

    updatePerson(id, {
      name,
      email,
      phone,
      job,
      title,
    });
    closeModal();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const { person, closeModal } = this.props;

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

EditPersonDialog.propTypes = {
  closeModal: PropTypes.func,
  updatePerson: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
  person: PropTypes.object,
};

export default EditPersonModal;
