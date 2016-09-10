import React, { PropTypes, Component } from 'react';

class ObgList extends Component {
  componentDidMount() {
    const { category, fetchListings, fetchAds } = this.props;

    console.log(category);

    fetchListings(category);
    fetchAds(category);
  }

  render() {
    /* const {
      brand,
      listings,
      ads,
      fetchAds,
      fetchListings,
    } = this.props; */

    // Need link to login and signup
    return (
      <div>
      </div>
    );
  }
}

ObgList.propTypes = {
  brand: PropTypes.object,
  listings: PropTypes.array,
  ads: PropTypes.object,
  category: PropTypes.string,
  fetchListings: PropTypes.func,
  fetchAds: PropTypes.func,
};

export default ObgList;
