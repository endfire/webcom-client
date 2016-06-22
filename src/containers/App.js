import 'bootstrap/dist/css/bootstrap.css';

import React, { PropTypes } from 'react';
import DevTools from './DevTools';

const App = ({ children }) => (
  <div className="container">
    {children}
    <DevTools />
  </div>
);

App.propTypes = {
  children: PropTypes.any,
};

export default App;
