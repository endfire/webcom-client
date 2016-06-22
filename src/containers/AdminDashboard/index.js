import React, { PropTypes } from 'react';
import Navbar from './containers/Navbar';

const AdminDashboard = ({ children }) => (
  <div>
    <Navbar />
    <div className="m-t-1">
      {children}
    </div>
  </div>
);

AdminDashboard.propTypes = {
  children: PropTypes.any,
};

export default AdminDashboard;
