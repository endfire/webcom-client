import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-fa';
import cx from 'classnames';
import { Link } from 'react-router';
import { getCurrentBrand } from 'selectors/adminBrands';
import * as actions from 'actions/store';
import styles from './brand.scss';

class Brand extends Component {
  componentDidMount() {
    const { fetchBrand, params: { brandID } } = this.props;

    fetchBrand(brandID);
  }

  renderSpinner() {
    return (
      <span>
        Loading <Icon name="spinner" spin />
      </span>
    );
  }

  render() {
    const { children, brand, params: { brandID } } = this.props;

    return (
      <div>
        <div className={styles.navbar}>
          <nav className={styles.navbarNav}>
            <ul className={styles.navbarList}>
              <li className={cx(styles.navbarItem, styles.navbarBrand)}>
                {brand ? brand.get('name') : this.renderSpinner()}
              </li>
              <li className={styles.navbarItem}>
                <Link
                  className={styles.navbarLink}
                  activeClassName={styles.isActive}
                  to={`/admin/brands/${brandID}/forms`}
                >
                  Forms
                </Link>
              </li>
              <li className={styles.navbarItem}>
                <Link
                  className={styles.navbarLink}
                  activeClassName={styles.isActive}
                  to={`/admin/brands/${brandID}/OBG`}
                >
                  OBG
                </Link>
              </li>
              <li className={styles.navbarItem}>
                <Link
                  className={styles.navbarLink}
                  activeClassName={styles.isActive}
                  to={`/admin/brands/${brandID}/settings`}
                >
                  Settings
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
  brand: getCurrentBrand(ownProps.params.brandID)(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchBrand: (id) => dispatch(actions.fetchRecord('brand', id)),
});

Brand.propTypes = {
  children: PropTypes.any,
  params: PropTypes.object,
  brand: PropTypes.object,
  fetchBrand: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Brand);
