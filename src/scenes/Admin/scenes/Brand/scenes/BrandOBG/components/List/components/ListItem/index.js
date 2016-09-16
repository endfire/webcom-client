/* eslint-disable react/jsx-no-bind */
import React, { PropTypes, cloneElement } from 'react';
import { DeleteModal } from 'scenes/components';
import styles from './styles.scss';

const ListItem = ({ item, handleDelete, canUserDelete, children }) => (
  <div className={styles.wrapper}>
    <div>
      {cloneElement(children, { item })}
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
  children: PropTypes.any,
};

export default ListItem;
