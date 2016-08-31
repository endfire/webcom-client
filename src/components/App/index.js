import 'normalize.css';
import 'paintcan/dist/paintcan.css';
import '../../styles/base.scss';
import { PropTypes } from 'react';

const App = ({ children }) => children;

App.propTypes = {
  children: PropTypes.any,
};

export default App;
