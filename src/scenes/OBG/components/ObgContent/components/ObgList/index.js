import React, { PropTypes } from 'react';
import { ListingList, AdList } from './components';
import styles from './styles.scss';
import moment from 'moment';

const now = new Date();
const fiveYearsAgo = new Date(now.getFullYear() - 5, now.getMonth(), now.getDay());

// Need link to login and signup
const ObgList = ({ listings, ads, category }) => (
  <div>
    <div className={styles.container}>
      {!ads.isEmpty()
        ? <AdList
          items={ads.filter(ad => (
            ad.get('categories').includes(category)
          )).sortBy(ad => (
            ad.get('priority')
          ))}
        />
        : <div className={styles.wrapperLoading}>
          <div></div>
        </div>
      }
    </div><br />
    <div className={styles.container}>
      {!listings.isEmpty()
        ? <ListingList
          items={listings.filter(listing => (
            listing.categories.includes(category) &&
            listing.company.get('approved') &&
            listing.company.get('description') &&
            (moment(listing.company.get('lastUpdated')).isAfter(fiveYearsAgo))
          )).sortBy(listing => (
            listing.company.get('name')
          ))}
        />
        : <div className={styles.wrapperLoading}>
          <div>
              Loading...
          </div>
        </div>
      }
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
