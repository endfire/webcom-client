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
      <h4>{label} - ${price}</h4>
      <p>{description}</p>
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
  );
};

ItemField.propTypes = {
  item: PropTypes.object,
  onChange: PropTypes.func,
};

export default ItemField;
