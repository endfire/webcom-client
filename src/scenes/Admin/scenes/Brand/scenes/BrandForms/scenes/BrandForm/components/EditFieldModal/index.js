import React, { PropTypes, Component } from 'react';
import { v4 } from 'node-uuid';
import { Icon } from 'react-fa';
import { Button, ButtonGroup, withModal } from 'paintcan';
import { ModalDialog } from 'components';

const EditFieldModal = withModal(
  ({ openModal, field }) => (
    <Button size="sm" onClick={openModal} color="primary">
      <Icon name="edit" /> Edit {field.get('type')} field
    </Button>
  ),
  ({ closeModal, field, updateField, isUpdateLoading }) => (
    <EditFieldDialog
      closeModal={closeModal}
      field={field}
      updateField={updateField}
      isUpdateLoading={isUpdateLoading}
    />
  ),
);

class EditFieldDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: props.field.get('label'),
      priority: props.field.get('priority'),
      placeholder: props.field.get('placeholder'),
      isRequired: props.field.get('isRequired'),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { field, updateField, isUpdateLoading, closeModal } = this.props;
    const { label, priority, placeholder, isRequired } = this.state;

    if (isUpdateLoading) return;

    updateField(field.get('id'), {
      label,
      priority,
      placeholder,
      isRequired,
    });

    closeModal();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const { field, closeModal } = this.props;

    return (
      <ModalDialog title={`Edit ${field.get('type')} field`} size="sm" closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="label">Name</label><br />
            <input
              type="text"
              id="label"
              name="label"
              onChange={handleChange}
              value={this.state.label}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="priority">Priority</label><br />
            <input
              type="number"
              id="priority"
              name="priority"
              min="0"
              onChange={handleChange}
              value={this.state.priority}
            />
          </fieldset>
          {field.get('type') === 'text'
            && <fieldset>
              <label htmlFor="placeholder">Placeholder</label><br />
              <input
                type="text"
                id="placeholder"
                name="placeholder"
                onChange={handleChange}
                value={this.state.placeholder}
              />
            </fieldset>
          }
          {field.get('type') !== 'checkbox'
            && <fieldset>
              <label htmlFor="isRequired">Is field required?</label>
              <select
                id="isRequired"
                name="isRequired"
                onChange={handleChange}
                value={this.state.isRequired}
                required
              >
                <option value="true">True</option>
                <option value="false">False</option>>
              </select>
            </fieldset>
          }
          {field.get('type') !== 'text' && field.get('options')
            && <fieldset>
              <label>Finalized Options (cannot change)</label>
              <select>
                {field.get('options').map(option => (
                  <option key={v4()}>
                    {option}
                  </option>)
                )}
              </select>
            </fieldset>
          }
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

EditFieldDialog.propTypes = {
  closeModal: PropTypes.func,
  field: PropTypes.object,
  updateField: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
};

export default EditFieldModal;
