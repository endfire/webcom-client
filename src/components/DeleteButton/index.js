import React, { PropTypes } from 'react';
import { Icon } from 'react-fa';
import styles from './styles.scss';

const DeleteButton = ({ onClick }) => (
  <button className={styles.btn} onClick={onClick}>
    <Icon className={styles.icon} name="times" />
  </button>
);

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
