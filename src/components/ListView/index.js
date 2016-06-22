import React, { PropTypes } from 'react';

const ListView = ({ children }) => (
  <div>
    {children}
  </div>
);

ListView.propTypes = {
  children: PropTypes.any,
};

export default ListView;
