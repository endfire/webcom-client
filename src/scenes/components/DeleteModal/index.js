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

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.handleDelete();
    this.props.closeModal();
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.trash}>
          <Icon name="trash" size="3x" />
          <span className={styles.trashMessage}>
            Are you sure you want to delete this?
          </span>
        </div>
        <div className={styles.buttons}>
          <button
            className={cx(styles.button, styles.confirm)}
            type="button"
            onClick={this.handleClick}
          >
            Yes
          </button>
          <button
            className={cx(styles.button, styles.cancel)}
            type="button"
            onClick={this.props.closeModal}
          >
            No
          </button>
        </div>
      </div>
    );
  }
}

DeleteDialog.propTypes = {
  closeModal: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default DeleteModal;
