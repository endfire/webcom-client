import React, { PropTypes } from 'react';
import styles from './styles.scss';

const ItemField = ({ item, onChange }) => {
  const price = item.get('price');
  const quantity = item.get('quantity');
  const description = item.get('description');
  const label = item.get('label');
  const id = item.get('id');

  return (
    <div className={styles.item}>
      <div className={styles.quantity}>
        <label htmlFor={id}>
          Quantity
        </label>
        <input
          type="number"
          id={id}
          name={id}
          min="0"
          onChange={onChange}
          value={quantity}
          placeholder="quantity"
          required
        />
      </div>
      <div className={styles.title}>
        {label}
      </div>
      <div className={styles.info}>
        <p>{description}</p>
      </div>
      <div className={styles.price}>
        <strong>${price}</strong>
      </div>
    </div>
  );
};

ItemField.propTypes = {
  item: PropTypes.object,
  onChange: PropTypes.func,
};

export default ItemField;
