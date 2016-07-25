import 'normalize.css';
import 'paintcan/dist/paintcan.css';
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
