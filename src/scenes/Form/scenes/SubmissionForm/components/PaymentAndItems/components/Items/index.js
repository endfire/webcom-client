import React, { PropTypes } from 'react';
import { ItemField } from './components';

const Items = ({ items, onChange }) => {
  const keys = items.keySeq();

  return (
    <div>
      {keys.map(key => {
        const item = items.get(key);

        return <ItemField key={key} item={item} onChange={onChange} />;
      })}
    </div>
  );
};

Items.propTypes = {
  items: PropTypes.object,
  onChange: PropTypes.func,
};

export default Items;
