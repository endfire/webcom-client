import 'bootstrap/dist/css/bootstrap.css';
import React, { PropTypes } from 'react';

const App = ({ children }) => (
  <div>
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.any,
};

export default App;