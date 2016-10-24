import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'paintcan';
import { Link } from 'react-router';
import { Icon } from 'react-fa';
import cx from 'classnames';
import { getSessionID } from 'selectors/company';
import * as types from 'constants/actionTypes';
import * as actions from 'actions/store';
import styles from './company.scss';

class Company extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const { fetchCompany, companyID } = this.props;

    fetchCompany(companyID);
  }

  handleLogout() {
    this.props.logoutRequest();
  }

  render() {
    return (
      <div>
        <div className={styles.navbar}>
          <nav className={styles.navbarNav}>
            <ul className={styles.navbarList}>
              <li className={styles.navbarItem}>
                <Link className={cx(styles.navbarLink, styles.navbarBrand)} to="/company">
                  Webcom
                </Link>
              </li>
              <li className={styles.navbarItem}>
                <Link className={styles.navbarLink} to="/company/listings">Add brands</Link>
              </li>
              <li className={styles.navbarItem}>
                <Link className={styles.navbarLink} to="/company/people">Add key people</Link>
              </li>
              <li className={styles.navbarItem}>
                <Link className={styles.navbarLink} to="/company/settings">Settings</Link>
              </li>
            </ul>
          </nav>
          <nav className={styles.navbarNav}>
            <Button onClick={this.handleLogout} size="sm">
              <Icon name="sign-out" /> Logout
            </Button>
          </nav>
        </div>

        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  companyID: getSessionID(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompany: (companyID) => dispatch(actions.fetchRecord('company', companyID)),
  logoutRequest: () => dispatch({
    type: types.LOGOUT_REQUEST,
    payload: '/company-login',
  }),
});

Company.propTypes = {
  companyID: PropTypes.string,
  children: PropTypes.any,
  fetchCompany: PropTypes.func,
  logoutRequest: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Company);
