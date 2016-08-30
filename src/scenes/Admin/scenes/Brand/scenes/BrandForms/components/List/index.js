import React, { PropTypes } from 'react';
import ListItem from './components/ListItem';

const List = ({ items, brandID, handleDelete, canUserDelete }) => {
  const keys = items.keySeq();

  return (<div>
    {keys.map(key => (<ListItem
      key={key}
      item={items.get(key)}
      brandID={brandID}
      handleDelete={handleDelete}
      canUserDelete={canUserDelete}
    />)
    )}
  </div>);
};

List.propTypes = {
  items: PropTypes.object,
  brandID: PropTypes.string,
  handleDelete: PropTypes.func,
  canUserDelete: PropTypes.bool,
};

export default List;
