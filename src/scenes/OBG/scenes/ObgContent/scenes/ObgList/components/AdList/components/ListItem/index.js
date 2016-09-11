/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import styles from './styles.scss';

const ListItem = ({ item }) => (
  <div className={styles.img}>
    <a href={item.get('url')} target="_blank">
      <img
        src={item.get('image')}
        alt={item.get('url')}
      />
    </a>
  </div>
);

ListItem.propTypes = {
  item: PropTypes.object,
};

export default ListItem;
