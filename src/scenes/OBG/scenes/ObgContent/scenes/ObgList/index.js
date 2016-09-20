import React, { PropTypes } from 'react';
import { ListingList, AdList } from './components';
import styles from './styles.scss';

// Need link to login and signup
const ObgList = ({ listings, ads, category }) => (
  <div>
    <div className={styles.container}>
      <AdList
        items={ads.filter(ad => (
          ad.get('categories').includes(category)
        )).sortBy(ad => (
          ad.get('priority')
        ))}
      />
    </div><br />
    <div className={styles.container}>
      <ListingList
        items={listings.filter(listing => (
          listing.categories.includes(category) && listing.company.get('approved')
        )).sortBy(listing => (
          listing.company.get('name')
        ))}
      />
    </div>
  </div>
);

ObgList.propTypes = {
  brand: PropTypes.object,
  listings: PropTypes.object,
  ads: PropTypes.object,
  category: PropTypes.string,
};

export default ObgList;