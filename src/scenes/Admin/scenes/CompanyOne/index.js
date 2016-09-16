import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-fa';
import { Link } from 'react-router';
import { getCurrentCompany } from 'selectors/adminCompanies';
import cx from 'classnames';
import * as actions from 'actions/store';
import styles from './company.scss';

class CompanyOne extends Component {
  componentDidMount() {
    const { fetchCompany, params: { companyID } } = this.props;

    fetchCompany(companyID);
  }

  renderSpinner() {
    return (
      <span>
        Loading <Icon name="spinner" spin />
      </span>
    );
  }

  render() {
    const { children, company, params: { companyID } } = this.props;

    return (
      <div>
        <div className={styles.navbar}>
          <nav className={styles.navbarNav}>
            <ul className={styles.navbarList}>
              <li className={cx(styles.navbarItem, styles.navbarBrand)}>
                {company ? company.get('name') : this.renderSpinner()}
              </li>
              <li className={styles.navbarItem}>
                <Link
                  className={styles.navbarLink}
                  activeClassName={styles.isActive}
                  to={`/admin/companies/${companyID}/listings`}
                >
                  Listings
                </Link>
              </li>
              <li className={styles.navbarItem}>
                <Link
                  className={styles.navbarLink}
                  activeClassName={styles.isActive}
                  to={`/admin/companies/${companyID}/ads`}
                >
                  Ads
                </Link>
              </li>
              <li className={styles.navbarItem}>
                <Link
                  className={styles.navbarLink}
                  activeClassName={styles.isActive}
                  to={`/admin/companies/${companyID}/people`}
                >
                  People
                </Link>
              </li>
              <li className={styles.navbarItem}>
                <Link
                  className={styles.navbarLink}
                  activeClassName={styles.isActive}
                  to={`/admin/companies/${companyID}/info`}
                >
                  Information
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {children}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  company: getCurrentCompany(ownProps.params.companyID)(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompany: (id) => dispatch(actions.fetchRecord('company', id)),
});

CompanyOne.propTypes = {
  children: PropTypes.any,
  params: PropTypes.object,
  company: PropTypes.object,
  fetchCompany: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyOne);
