import React, { PropTypes } from 'react';
import { Icon } from 'react-fa';
import styles from './styles.scss';

const ListItemWrapper = ({ item }) => (
  <div className={styles.item}>
    {item}
  </div>
);

const ListItem = ({ icon, left, right }) => (
  <div className={styles.row}>
    <div className={styles.icon}>
      <Icon name={icon} size="lg" />
    </div>
    <div className={styles.left}>
      {left.map((item, idx) => (<ListItemWrapper key={idx} item={item} />))}
    </div>
    <div className={styles.right}>
      {right.map((item, idx) => (<ListItemWrapper key={idx} item={item} />))}
    </div>
  </div>
);

ListItemWrapper.propTypes = {
  item: PropTypes.any,
};

ListItem.propTypes = {
  icon: PropTypes.string,
  left: PropTypes.array,
  right: PropTypes.array,
};

export default ListItem;
