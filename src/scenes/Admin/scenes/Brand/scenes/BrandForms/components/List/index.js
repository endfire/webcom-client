import React, { PropTypes } from 'react';
import { ListItem } from './components';

const List = ({ items, brandID, handleDelete, canUserDelete, updateForm, isUpdateLoading }) => {
  const keys = items.keySeq().toArray();

  return (<div>
    {keys.map(key => (<ListItem
      key={key}
      item={items.get(key)}
      brandID={brandID}
      handleDelete={handleDelete}
      canUserDelete={canUserDelete}
      updateForm={updateForm}
      isUpdateLoading={isUpdateLoading}
    />)
    )}
  </div>);
};

List.propTypes = {
  items: PropTypes.object,
  brandID: PropTypes.string,
  handleDelete: PropTypes.func,
  canUserDelete: PropTypes.bool,
  updateForm: PropTypes.func,
  isUpdateLoading: PropTypes.bool,
};

export default List;
