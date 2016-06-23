import React, { PropTypes } from 'react';
import Navbar from './containers/Navbar';

const AdminDashboard = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
);

AdminDashboard.propTypes = {
  children: PropTypes.any,
};

export default AdminDashboard;
