import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'paintcan';
import { Icon } from 'react-fa';
import { Link } from 'react-router';
import cx from 'classnames';
import * as types from 'constants/actionTypes';
import styles from './admin.scss';

const Admin = ({ children, logoutRequest }) => (
  <div>
    <div className={styles.navbar}>
      <nav className={styles.navbarNav}>
        <ul className={styles.navbarList}>
          <li className={styles.navbarItem}>
            <Link className={cx(styles.navbarLink, styles.navbarBrand)} to="/admin">Webcom</Link>
          </li>
          <li className={styles.navbarItem}>
            <Link className={styles.navbarLink} to="/admin/brands">Brands</Link>
          </li>
          <li className={styles.navbarItem}>
            <Link className={styles.navbarLink} to="/admin/companies">Companies</Link>
          </li>
          <li className={styles.navbarItem}>
            <Link className={styles.navbarLink} to="/admin/users">Users</Link>
          </li>
        </ul>
      </nav>
      <nav className={styles.navbarNav}>
        <Button onClick={logoutRequest} size="sm">
          <Icon name="sign-out" /> Logout
        </Button>
      </nav>
    </div>

    {children}
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  logoutRequest: () => dispatch({
    type: types.LOGOUT_REQUEST,
    payload: '/admin-login',
  }),
});

Admin.propTypes = {
  children: PropTypes.any,
  logoutRequest: PropTypes.func,
};

export default connect(
  null,
  mapDispatchToProps,
)(Admin);
