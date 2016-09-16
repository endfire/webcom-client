import React, { PropTypes, Component } from 'react';
import { Button, ButtonGroup, withModal } from 'paintcan';
import { ModalDialog } from 'components';

const EditOBGModal = withModal(
  ({ isOpen, openModal }) => (
    <Button active={isOpen} onClick={openModal} color="primary">
      Edit OBG description
    </Button>
  ),
  ({ closeModal, OBG, updateOBG, isUpdateLoading }) => (
    <EditOBGDialog
      closeModal={closeModal}
      OBG={OBG}
      updateOBG={updateOBG}
      isUpdateLoading={isUpdateLoading}
    />
  ),
);

class EditOBGDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.OBG.get('obgDescription') ? props.OBG.get('obgDescription') : '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isUpdateLoading, updateOBG, closeModal } = this.props;
    const id = this.props.OBG.get('id');
    const { description } = this.state;

    if (isUpdateLoading) return;

    updateOBG(id, {
      obgDescription: description,
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
      <ModalDialog title="Edit OBG description" size="sm" closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="name">Description</label><br />
            <input
              type="text"
              id="description"
              name="description"
              onChange={handleChange}
              value={this.state.description}
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

EditOBGDialog.propTypes = {
  closeModal: PropTypes.func,
  updateOBG: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
  OBG: PropTypes.object,
};

export default EditOBGModal;
