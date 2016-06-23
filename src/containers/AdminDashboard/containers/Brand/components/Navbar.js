import React from 'react';
import { Link } from 'react-router';

const Navbar = () => (
  <nav className="navbar navbar-full navbar-dark bg-inverse">
    <div className="container">
      <Link to="admin/brands" className="navbar-brand">Brand name</Link>
      <ul className="nav navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="#">Forms <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="#">
            Brand settings <span className="sr-only">(current)</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
