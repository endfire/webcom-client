import React, { Component, PropTypes } from 'react';
import { Icon } from 'react-fa';
import { Button, ButtonGroup } from 'paintcan';
import EditableInput from '../EditableInput';
import styles from './styles.scss';

class Field extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    updateField: PropTypes.func.isRequired,
    deleteField: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { isEditing: false, label: props.field.get('label') };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.renderControls = this.renderControls.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleEdit() {
    if (!this.state.isEditing && this.labelRef) {
      this.labelRef.focus();
    }

    this.setState({ isEditing: !this.state.isEditing });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSave() {
    const { field, updateField } = this.props;
    const { label } = this.state;

    updateField(field.get('id'), {
      label,
    });

    this.setState({ isEditing: false });
  }

  renderControls() {
    const { isEditing } = this.state;

    if (isEditing) {
      return (
        <ButtonGroup spaced>
          {/* <DeleteModal size="sm" handleDelete={() => deleteField(field.get('id'))} /> */}
          <Button size="sm" color="primary" onClick={this.handleSave}>
            <Icon name="save" /> Save field
          </Button>
          <Button size="sm" color="danger" onClick={this.toggleEdit}>
            <Icon name="close" /> Cancel
          </Button>
        </ButtonGroup>
      );
    }

    return (
      <Button size="sm" color="primary" onClick={this.toggleEdit}>
        <Icon name="lock" /> Edit field
      </Button>
    );
  }

  render() {
    const { isEditing, label } = this.state;

    return (
      <div className={styles.field}>
        <div className={styles.fieldHeader}>
          <EditableInput
            isEditing={isEditing}
            value={label}
            name="label"
            onChange={this.handleChange}
            ref={(ref) => (this.labelRef = ref)}
          />
          {this.renderControls()}
        </div>
      </div>
    );
  }
}

export default Field;
