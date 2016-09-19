  import React, { PropTypes } from 'react';

  const ItemField = ({ item, onChange }) => {
    const price = item.get('price');
    const quantity = item.get('quantity');
    const description = item.get('description');
    const label = item.get('label');
    const id = item.get('id');

    return (
      <fieldset>
        <label htmlFor={id}>{label}</label>
        <h3>{price}</h3>
        <p>{description}</p>
        <input
          type="number"
          id={id}
          name={id}
          min="0"
          onChange={onChange}
          value={quantity}
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
