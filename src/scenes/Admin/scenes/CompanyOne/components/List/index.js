import React, { PropTypes } from 'react';
import ListItem from './components/ListItem';

const List = ({ items, handleDelete, canUserDelete, children }) => {
  const keys = items.keySeq().toArray();

  return (<div>
    {keys.map(key => (<ListItem
      key={key}
      item={items.get(key)}
      handleDelete={handleDelete}
      canUserDelete={canUserDelete}
    >{children}</ListItem>)
    )}
  </div>);
};

List.propTypes = {
  items: PropTypes.object,
  handleDelete: PropTypes.func,
  children: PropTypes.any,
  canUserDelete: PropTypes.bool,
};

export default List;
