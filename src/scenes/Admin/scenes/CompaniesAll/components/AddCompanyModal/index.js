import React, { PropTypes, Component } from 'react';
import { Button, withModal, ButtonGroup } from 'paintcan';
import { ModalDialog } from 'components';

const AddCompanyModal = withModal(
  ({ isOpen, openModal }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      Add a new company
    </Button>
  ),
  ({
    closeModal,
    createCompany,
    isCreateLoading,
  }) => (
    <AddCompanyDialog
      closeModal={closeModal}
      createCompany={createCompany}
      isCreateLoading={isCreateLoading}
    />
  ),
);

class AddCompanyDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isCreateLoading, createCompany, closeModal } = this.props;
    const { name, email, password } = this.state;

    if (isCreateLoading) return;

    createCompany({
      name,
      email,
      password,
      listings: [],
      ads: [],
      people: [],
      approved: true,
    });
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
      <ModalDialog title="Add a new company" size="sm" closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="name">Name</label><br />
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={this.state.name}
              placeholder="Apple"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="name">Email</label><br />
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              value={this.state.email}
              placeholder="john@apple.com"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="name">Password</label><br />
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={this.state.password}
              placeholder="••••••••"
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

AddCompanyDialog.propTypes = {
  closeModal: PropTypes.func,
  createCompany: PropTypes.func,
  isCreateLoading: PropTypes.bool,
};

export default AddCompanyModal;
