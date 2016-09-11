import React, { PropTypes } from 'react';
import { ListingList, AdList } from './components';

// Need link to login and signup
const ObgList = ({ listings, ads, category }) => (
  <div>
    <AdList
      items={ads.filter(ad => (
        ad.get('categories').includes(category)
      ))}
    /><br />
    <ListingList
      items={listings.filter(listing => (
        listing.categories.includes(category)
      ))}
    />
  </div>
);

ObgList.propTypes = {
  brand: PropTypes.object,
  listings: PropTypes.object,
  ads: PropTypes.object,
  category: PropTypes.string,
};

export default ObgList;
