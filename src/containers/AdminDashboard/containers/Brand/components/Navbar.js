import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Navbar = ({ brand, params }) => {
  console.log('params:', params);

  const id = '1';
  const { name } = brand || { name: 'Loading...' };
  const indexPath = `/admin/brands/${id}`;
  const settingsPath = `/admin/brands/${id}/settings`;

  return (
    <nav className="navbar navbar-full navbar-dark bg-inverse">
      <div className="container">
        <Link to={indexPath} className="navbar-brand">{name}</Link>
        <ul className="nav navbar-nav">
          <li className="nav-item active">
            <Link to={indexPath} className="nav-link">Forms</Link>
          </li>
          <li className="nav-item">
            <Link to={settingsPath} className="nav-link">Brand settings</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  brand: PropTypes.any,
};

export default Navbar;
