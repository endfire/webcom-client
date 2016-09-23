/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { DeleteModal } from 'scenes/components';
import styles from './styles.scss';

const ListItem = ({ item, handleDelete, canUserDelete, isDeleteEnabled }) => (
  <div className={styles.wrapper}>
    <div>
      <Link to={`/admin/brands/${item.get('id')}`}>{item.get('name')}</Link>
    </div>
    <div>
      {canUserDelete && isDeleteEnabled
        && <DeleteModal handleDelete={handleDelete.bind(this, item.get('id'))} />
      }
    </div>
  </div>
);

ListItem.propTypes = {
  item: PropTypes.object,
  brandID: PropTypes.string,
  handleDelete: PropTypes.func,
  canUserDelete: PropTypes.bool,
  isDeleteEnabled: PropTypes.bool,
};

export default ListItem;
