import React, { PropTypes, Component } from 'react';
import { Button, withModal } from 'paintcan';
import { Icon } from 'react-fa';
import cx from 'classnames';
import styles from './styles.scss';

const DeleteModal = withModal(
  ({ isOpen, openModal, size }) => (
    <Button active={isOpen} onClick={openModal} color="danger" size={size || 'md'}>
      <Icon name="close" /> Delete
    </Button>
  ),
  ({ closeModal, handleDelete }) => (
    <DeleteDialog
      closeModal={closeModal}
      handleDelete={handleDelete}
    />
  ),
);

class DeleteDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderCancelButton = this.renderCancelButton.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
    this.renderConfirmDelete = this.renderConfirmDelete.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.handleDelete();
    this.props.closeModal();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  renderCancelButton() {
    return (
      <div className={styles.buttons}>
        <button
          className={cx(styles.button, styles.cancel)}
          type="button"
          onClick={this.props.closeModal}
        >
          Cancel
        </button>
      </div>
    );
  }

  renderDeleteButton() {
    return (
      <div className={styles.buttons}>
        <button
          className={cx(styles.button, styles.confirm)}
          type="button"
          onClick={this.handleClick}
        >
          Delete
        </button>
      </div>
    );
  }

  renderConfirmDelete() {
    return (
      <fieldset>
        <input
          type="text"
          id="confirmDelete"
          name="confirmDelete"
          onChange={this.handleChange}
          value={this.state.confirmDelete}
          placeholder="I WANT TO DELETE"
        />
      </fieldset>
    );
  }

  render() {
    const { renderConfirmDelete, renderDeleteButton, renderCancelButton } = this;

    return (
      <div className={styles.wrapper}>
        <div className={styles.trash}>
          <Icon name="trash" size="3x" />
          <span className={styles.trashMessage}>
            Are you sure you want to delete this?
          </span>
        </div>
        {renderConfirmDelete()}
        {this.state.confirmDelete === 'I WANT TO DELETE'
          ? renderDeleteButton()
          : renderCancelButton()
        }
      </div>
    );
  }
}

DeleteDialog.propTypes = {
  closeModal: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default DeleteModal;
