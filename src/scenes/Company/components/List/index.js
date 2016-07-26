import React, { PropTypes } from 'react';
import ListItem from './components/ListItem';

const List = ({ items, handleDelete, children }) => {
  const keys = Object.keys(items);

  return (<div>
    {keys.map(key => (<ListItem
      key={key}
      item={items[key]}
      handleDelete={handleDelete}
    >{children}</ListItem>)
    )}
  </div>);
};

List.propTypes = {
  items: PropTypes.object,
  handleDelete: PropTypes.func,
  children: PropTypes.any,
};

export default List;
