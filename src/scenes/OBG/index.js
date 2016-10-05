import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'paintcan';
import * as actions from 'actions/store';
import { ObgContent } from './components';
import {
  getCurrentBrand,
  getCategorySelectOptions,
  getCategoryObgListings,
  getCategoryObgAds,
} from 'selectors/obg';

import styles from './styles.scss';

class OBG extends Component {
  componentDidMount() {
    const { fetchBrand } = this.props;

    fetchBrand();
  }

  render() {
    const {
      brand,
      categoryOptions,
      listings,
      ads,
      fetchAds,
      fetchListings,
    } = this.props;

    const renderOBG = () => (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3>{`${brand.get('name')} OBG`}</h3>
        </div>
        <div className={styles.headImage}>
          <img
            src={brand.get('image')}
            alt={brand.get('name')}
          />
        </div>
        <div className={styles.header}>
          <div className={styles.nav}>
            <Link to="/signup">
              <Button color="primary">
                Submit a free listing
              </Button>
            </Link> &nbsp; &nbsp;
            <Link to="/company-login">
              <Button color="primary">
                Login
              </Button>
            </Link><br />
          </div>
          <p>
            {brand.get('obgDescription')}
          </p>
        </div>
        <div className={styles.header}>
          <ObgContent
            brand={brand}
            categoryOptions={categoryOptions}
            listings={listings}
            ads={ads}
            fetchAds={fetchAds}
            fetchListings={fetchListings}
          />
        </div>
      </div>
    );

    // Need link to login and signup
    return (
      <div>
        {brand ? renderOBG() : 'Loading...'}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  brand: getCurrentBrand(ownProps.params.brandID)(state),
  categoryOptions: getCategorySelectOptions(ownProps.params.brandID)(state),
  listings: getCategoryObgListings(state),
  ads: getCategoryObgAds(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBrand: () => dispatch(actions.fetchRecord('brand', ownProps.params.brandID, {
    without: {
      categories: {
        listings: true,
        ads: true,
      },
    },
  })),
  fetchAds: (categoryID) => dispatch(
    actions.fetchRelated('category', categoryID, 'ads', 'ad', {
      sideload: {
        categories: false,
      },
      without: {
        categories: {
          listings: true,
          ads: true,
        },
      },
    })
  ),
  fetchListings: (categoryID) => dispatch(
    actions.fetchRelated('category', categoryID, 'listings', 'listing', {
      sideload: {
        categories: false,
      },
      without: {
        categories: {
          listings: true,
          ads: true,
        },
      },
    })
  ),
});

OBG.propTypes = {
  brand: PropTypes.object,
  categoryOptions: PropTypes.array,
  listings: PropTypes.object,
  ads: PropTypes.object,
  fetchBrand: PropTypes.func,
  fetchListings: PropTypes.func,
  fetchAds: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OBG);
