import React, { PropTypes, Component } from 'react';
import { v4 } from 'node-uuid';
import { Icon } from 'react-fa';
import { Button, ButtonGroup, withModal } from 'paintcan';
import { ModalDialog } from 'components';

const AddFieldModal = withModal(
  ({ openModal }) => (
    <Button size="sm" onClick={openModal} color="primary">
      <Icon name="plus" /> Add field
    </Button>
  ),
  ({ closeModal, formID, createField, isCreateLoading }) => (
    <AddFieldDialog
      closeModal={closeModal}
      formID={formID}
      createField={createField}
      isCreateLoading={isCreateLoading}
    />
  ),
);

class AddFieldDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: '',
      priority: '',
      type: 'text',
      options: [],
      currentOption: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleRemoveLastOption = this.handleRemoveLastOption.bind(this);
    this.handleRemoveFirstOption = this.handleRemoveFirstOption.bind(this);
    this.renderOptionControls = this.renderOptionControls.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { formID, createField, isCreateLoading, closeModal } = this.props;
    const { label, priority, type, options } = this.state;

    if (isCreateLoading) return;

    createField({
      form: formID,
      isRequired: true,
      label,
      priority,
      type,
      options,
    });

    closeModal();
  }

  handleAddOption() {
    const { options, currentOption } = this.state;

    options.push(currentOption);

    this.setState({
      options,
      currentOption: '',
    });
  }

  handleRemoveLastOption() {
    const { options } = this.state;

    options.pop();

    this.setState({ options });
  }

  handleRemoveFirstOption() {
    const { options } = this.state;

    options.shift();

    this.setState({ options });
  }

  renderOptionControls() {
    const { type } = this.state;
    const {
      handleChange,
      handleAddOption,
      handleRemoveLastOption,
      handleRemoveFirstOption,
    } = this;

    if (!type || type === 'text') return null;

    return (
      <fieldset>
        <label htmlFor="currentOption">Option to Add</label><br />
        <input
          type="text"
          id="currentOption"
          name="currentOption"
          onChange={handleChange}
          value={this.state.currentOption}
        />
        <Button type="button" size="sm" color="primary" onClick={handleAddOption}>
          Add this option
        </Button><br />
        {this.state.options.length > 0
          ? <fieldset>
            <label>Current Options</label>
            <select>
              {this.state.options.map(option => (
                <option key={v4()}>
                  {option}
                </option>)
              )}
            </select>
          </fieldset>
          : <p>No Current Options</p>
        }
        <ButtonGroup spaced>
          <Button type="button" size="sm" color="danger" onClick={handleRemoveLastOption}>
            Delete last option
          </Button>
          <Button type="button" size="sm" color="danger" onClick={handleRemoveFirstOption}>
            Delete first option
          </Button>
        </ButtonGroup><br />
      </fieldset>
    );
  }

  render() {
    const { closeModal } = this.props;
    const { handleSubmit, handleChange, renderOptionControls } = this;

    return (
      <ModalDialog title="Add a field" size="sm" closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="label">Label</label><br />
            <input
              type="text"
              id="label"
              name="label"
              onChange={handleChange}
              value={this.state.label}
              required
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
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="type">Field type</label>
            <select
              id="type"
              name="type"
              onChange={handleChange}
              value={this.state.type}
              required
            >
              <option value="text">Text</option>
              <option value="select">Select</option>
              <option value="checkbox">Checkbox</option>
            </select>
          </fieldset>
          {renderOptionControls()}
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

AddFieldDialog.propTypes = {
  formID: PropTypes.string,
  createField: PropTypes.func,
  isCreateLoading: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default AddFieldModal;
