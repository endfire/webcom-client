import React, { PropTypes } from 'react';
import { Icon } from 'react-fa';
import cx from 'classnames';
import styles from './dialog.scss';

const ModalDialog = ({ title, size, closeModal, children }) => (
  <div className={cx(styles.wrapper, styles[size])}>
    <div className={styles.header}>
      <span>{title}</span>
      <Icon className={styles.close} name="close" onClick={closeModal} />
    </div>
    <div className={styles.body}>
      {children}
    </div>
  </div>
);

ModalDialog.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

ModalDialog.defaultProps = {
  size: 'md',
};

export default ModalDialog;
