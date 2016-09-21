import React, { PropTypes } from 'react';
import { EditItemModal, DeleteItemModal } from '../';
import { ButtonGroup } from 'paintcan';
import styles from './styles.scss';

const Item = ({ item, updateItem, deleteItem, isUpdateLoading, isDeleteLoading }) => (
  <div className={styles.item}>
    <div className={styles.itemHeader}>
      <h3>{item.get('label')}</h3>
      <ButtonGroup spaced>
        <EditItemModal
          item={item}
          updateItem={updateItem}
          isUpdateLoading={isUpdateLoading}
        />
        <DeleteItemModal
          itemID={item.get('id')}
          deleteItem={deleteItem}
          isDeleteLoading={isDeleteLoading}
        />
      </ButtonGroup>
    </div>
  </div>
);

Item.propTypes = {
  item: PropTypes.object.isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  isUpdateLoading: PropTypes.bool,
  isDeleteLoading: PropTypes.bool,
};

export default Item;
