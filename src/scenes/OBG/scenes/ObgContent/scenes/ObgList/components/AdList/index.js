import React, { PropTypes } from 'react';
import ListItem from './components/ListItem';

const AdList = ({ items }) => {
  const keys = items.keySeq();

  return (<div>
    {keys.map(key => (<ListItem
      key={key}
      item={items.get(key)}
    />)
    )}
  </div>);
};

AdList.propTypes = {
  items: PropTypes.object,
};

export default AdList;
