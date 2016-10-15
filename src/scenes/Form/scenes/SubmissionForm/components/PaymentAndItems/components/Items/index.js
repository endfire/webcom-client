import React, { PropTypes } from 'react';
import { ItemField } from './components';
import styles from './styles.scss';

const Items = ({ items, onChange }) => {
  const keys = items.sortBy(item => item.get('priority')).keySeq().toArray();

  return (
    <div className={styles.wrapper}>
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
