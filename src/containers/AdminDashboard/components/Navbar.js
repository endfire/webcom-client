import React, { PropTypes } from 'react';
import NavItem from '../../../components/NavItem';

const Navbar = ({ shouldShowNavs, login, logout }) => {
  let navs;

  if (shouldShowNavs) {
    navs = (
      <div>
        <ul className="nav navbar-nav">
          <NavItem to="/admin">Brands</NavItem>
          <NavItem to="/admin/companies">Companies</NavItem>
          <NavItem to="/admin/obg">OBG</NavItem>
          <NavItem to="/admin/users">Users</NavItem>
        </ul>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={logout}>Logout</a>
          </li>
        </ul>
      </div>
    );
  } else {
    navs = (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={login}>Login</a>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-light bg-faded">
      <div classNameName="container">
        <a className="navbar-brand" href="#">Webcom</a>
        {navs}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  shouldShowNavs: PropTypes.bool,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Navbar;
