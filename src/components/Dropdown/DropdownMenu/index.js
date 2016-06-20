import React, { PropTypes } from 'react';

const DropdownMenu = ({ children }) => (
  <div className="dropdown-menu">
    {children}
  </div>
);

DropdownMenu.propTypes = {
  children: PropTypes.any,
};

export default DropdownMenu;
