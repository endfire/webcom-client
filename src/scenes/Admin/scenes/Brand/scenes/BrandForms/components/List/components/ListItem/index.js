/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, ButtonGroup } from 'paintcan';
import { DeleteModal } from 'scenes/components';
import { EditFormDetailsModal } from '../';
import styles from './styles.scss';

const ListItem = ({ item, brandID, handleDelete, canUserDelete, updateForm, isUpdateLoading }) => (
  <div className={styles.wrapper}>
    <div>
      <Link to={`/admin/brands/${brandID}/forms/${item.get('id')}`}>{item.get('name')}</Link>
    </div>
    <ButtonGroup spaced>
      {item.get('didPublish')
        && <Link to={`/form/${item.get('id')}`}><Button size="sm">To published form</Button></Link>
      } &nbsp;
      <EditFormDetailsModal
        form={item}
        updateForm={updateForm}
        isUpdateLoading={isUpdateLoading}
      />
      {canUserDelete
        && <DeleteModal size="sm" handleDelete={handleDelete.bind(this, item.get('id'))} />
      }
    </ButtonGroup>
  </div>
);

ListItem.propTypes = {
  item: PropTypes.object,
  brandID: PropTypes.string,
  handleDelete: PropTypes.func,
  canUserDelete: PropTypes.bool,
  updateForm: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
};

export default ListItem;
