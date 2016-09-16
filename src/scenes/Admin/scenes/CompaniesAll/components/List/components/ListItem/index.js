/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { DeleteModal } from 'scenes/components';
import styles from './styles.scss';

const ListItem = ({ item, handleDelete, canUserDelete }) => (
  <div className={styles.wrapper}>
    <div>
      <Link to={`/admin/companies/${item.get('id')}/info`}>{item.get('name')}</Link>
    </div>
    <div>
      {!item.get('approved') &&
        <Link to={`/admin/companies/${item.get('id')}/info`}>Needs approval</Link>} &nbsp;
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
