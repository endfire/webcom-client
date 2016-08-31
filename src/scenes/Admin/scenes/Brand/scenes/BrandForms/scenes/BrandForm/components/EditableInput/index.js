import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './styles.scss';

const EditableInput = ({ isEditing, ...props }) => (
  <input
    disabled={!isEditing}
    className={cx({
      [styles.input]: true,
      [styles.isEditing]: isEditing,
    })}
    {...props}
  />
);

EditableInput.propTypes = {
  isEditing: PropTypes.bool,
};

EditableInput.defaultProps = {
  isEditing: false,
};

export default EditableInput;
