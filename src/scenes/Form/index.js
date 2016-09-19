import 'normalize.css';
import 'paintcan/dist/paintcan.css';
import 'styles/base.scss';
import { PropTypes } from 'react';

const Form = ({ children }) => children;

Form.propTypes = {
  children: PropTypes.any,
};

export default Form;
