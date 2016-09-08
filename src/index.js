import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import store from './configureStore';
import routes from './routes';
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';

render(
  <Root store={store} routes={routes} />,
  document.getElementById('root')
);
