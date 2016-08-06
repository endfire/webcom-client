import React, { PropTypes } from 'react';

const Brand = ({ children }) => (
  <div>
    <p>Need brand subnavbar here</p>

    {children}
  </div>
);

Brand.propTypes = {
  children: PropTypes.any,
};

export default Brand;
