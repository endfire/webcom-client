/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import styles from './styles.scss';

const ListItem = ({ item }) => (
  <div className={styles.wrapper}>
    <div>
      <p>
        <strong>{item.company.get('name')}</strong>
      </p>
    </div>
    <div>
      <p>
        {item.company.get('description')}
      </p>
    </div>
  </div>
);

ListItem.propTypes = {
  item: PropTypes.object,
};

export default ListItem;
