import React, { PropTypes, Component } from 'react';
import { Button, withModal } from 'paintcan';
import { Icon } from 'react-fa';
import cx from 'classnames';
import styles from './styles.scss';

const DeleteFieldModal = withModal(
  ({ isOpen, openModal }) => (
    <Button size="sm" active={isOpen} onClick={openModal} color="danger">
      <Icon name="close" /> Delete
    </Button>
  ),
  ({ closeModal, fieldID, deleteField, isDeleteLoading }) => (
    <DeleteFieldDialog
      closeModal={closeModal}
      fieldID={fieldID}
      deleteField={deleteField}
      isDeleteLoading={isDeleteLoading}
    />
  ),
);

class DeleteFieldDialog extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    const { fieldID, deleteField, isDeleteLoading, closeModal } = this.props;

    if (isDeleteLoading) return;

    deleteField(fieldID);
    closeModal();
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

DeleteFieldDialog.propTypes = {
  closeModal: PropTypes.func,
  fieldID: PropTypes.string,
  deleteField: PropTypes.func,
  isDeleteLoading: PropTypes.bool,
};

export default DeleteFieldModal;
