import React, { PropTypes } from 'react';
import ListItem from './components/ListItem';

const List = ({ people, handleDelete }) => {
  const keys = Object.keys(people);

  return (<div>
    {keys.map(key => (<ListItem
      key={key}
      person={people[key]}
      handleDelete={handleDelete}
    />)
    )}
  </div>);
};

List.propTypes = {
  people: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default List;
