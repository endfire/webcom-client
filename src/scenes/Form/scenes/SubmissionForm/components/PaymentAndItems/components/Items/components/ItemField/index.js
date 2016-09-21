  import React, { PropTypes } from 'react';

  const ItemField = ({ item, onChange }) => {
    const price = item.get('price');
    const quantity = item.get('quantity');
    const description = item.get('description');
    const label = item.get('label');
    const id = item.get('id');

    return (
      <fieldset>
        <p>{label}</p>
        <label htmlFor={id}>
          Price: ${price}<br />
          Description: {description}
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
      </fieldset>
    );
  };

  ItemField.propTypes = {
    item: PropTypes.object,
    onChange: PropTypes.func,
  };

  export default ItemField;
