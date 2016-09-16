/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import { DeleteModal } from 'scenes/components';
import styles from './styles.scss';

const ListItem = ({ item, handleDelete, canUserDelete }) => (
  <div className={styles.wrapper}>
    <div>
      <p>
        <strong>{item.get('name')}</strong> - Role({item.get('role')})
      </p>
    </div>
    <div>
      {canUserDelete && <DeleteModal handleDelete={handleDelete.bind(this, item.get('id'))} />}
    </div>
  </div>
);

ListItem.propTypes = {
  item: PropTypes.object,
  handleDelete: PropTypes.func,
  canUserDelete: PropTypes.bool,
};

export default ListItem;
