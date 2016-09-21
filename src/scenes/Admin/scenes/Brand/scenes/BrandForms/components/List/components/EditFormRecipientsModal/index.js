import React, { PropTypes, Component } from 'react';
import { Icon } from 'react-fa';
import { Button, ButtonGroup, withModal } from 'paintcan';
import { ModalDialog } from 'components';

const EditFormRecipientsModal = withModal(
  ({ openModal }) => (
    <Button size="sm" onClick={openModal} color="primary">
      <Icon name="edit" /> Edit form recipients
    </Button>
  ),
  ({ closeModal, form, updateForm, isUpdateLoading }) => (
    <EditFormRecipientsDialog
      closeModal={closeModal}
      form={form}
      updateForm={updateForm}
      isUpdateLoading={isUpdateLoading}
    />
  ),
);

class EditFormRecipientsDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipientOne: props.form.get('recipientOne'),
      recipientTwo: props.form.get('recipientTwo'),
      recipientThree: props.form.get('recipientThree'),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { closeModal, form, updateForm, isUpdateLoading } = this.props;
    const { recipientOne, recipientTwo, recipientThree } = this.state;

    if (isUpdateLoading) return;

    updateForm(form.get('id'), {
      recipientOne,
      recipientTwo,
      recipientThree,
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
      <ModalDialog title="Add a form" size="sm" closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="recipientOne">Recipient One Email</label>
            <input
              type="text"
              id="recipientOne"
              name="recipientOne"
              onChange={handleChange}
              value={this.state.recipientOne}
              placeholder="recipientone@gmail.com"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="recipientTwo">Recipient Two Email</label>
            <input
              type="text"
              id="recipientTwo"
              name="recipientTwo"
              onChange={handleChange}
              value={this.state.recipientTwo}
              placeholder="recipienttwo@gmail.com"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="recipientThree">Recipient Three Email</label>
            <input
              type="text"
              id="recipientThree"
              name="recipientThree"
              onChange={handleChange}
              value={this.state.recipientThree}
              placeholder="recipientthree@gmail.com"
            />
          </fieldset>
          <fieldset>
            <ButtonGroup spaced>
              <Button onClick={closeModal} color="danger">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Update
              </Button>
            </ButtonGroup>
          </fieldset>
        </form>
      </ModalDialog>
    );
  }
}

EditFormRecipientsDialog.propTypes = {
  closeModal: PropTypes.func,
  form: PropTypes.object,
  updateForm: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
};

export default EditFormRecipientsModal;
