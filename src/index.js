import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './configureStore';
import routes from './routes';

const store = configureStore();

render(
  <Root store={store} routes={routes} />,
  document.getElementById('root')
);
