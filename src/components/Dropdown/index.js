import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Dropdown = ({ open, children }) => {
  const classes = classNames('dropdown', { open });

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

Dropdown.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.any,
};

Dropdown.defaultProps = {
  open: false,
};

export default Dropdown;
