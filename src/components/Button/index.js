import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Button = ({ text, type, size, loading, disabled, onClick, isDropdown }) => {
  const classes = classNames('btn', `btn-${type}`, `btn-${size}`, {
    'dropdown-toggle': isDropdown,
  });

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {loading ? 'Loading' : text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  isDropdown: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'secondary',
  size: 'md',
  loading: false,
  disabled: false,
};

export default Button;
