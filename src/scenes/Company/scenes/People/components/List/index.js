import React, { PropTypes } from 'react';
import ListItem from './components/ListItem';

const List = ({ people, deleteHandler }) => {
  const keys = Object.keys(people);

  return (<div>
    {keys.map(key => (<ListItem
      key={key}
      person={people[key]}
      deleteHandler={deleteHandler}
    />)
    )}
  </div>);
};

List.propTypes = {
  people: PropTypes.object,
  deleteHandler: PropTypes.func,
};

export default List;
