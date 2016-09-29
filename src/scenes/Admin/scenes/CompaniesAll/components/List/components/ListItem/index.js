/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { DeleteModal } from 'scenes/components';
import { Button } from 'paintcan';
import styles from './styles.scss';

const ListItem = ({ item, handleDelete, canUserDelete }) => (
  <div className={styles.wrapper}>
    <div>
      <Link to={`/admin/companies/${item.get('id')}/info`}>{item.get('name')}</Link><br /><br />
      <div className={styles.date}>Last Updated: {item.get('lastUpdated')}</div>
    </div>
    <div>
      {!item.get('approved') &&
        <Button color="primary">
          <Link to={`/admin/companies/${item.get('id')}/info`} className={styles.link}>
            Needs approval
          </Link>
        </Button>
      } &nbsp;
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
