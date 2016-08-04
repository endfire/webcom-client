import { combineReducers } from 'redux';
import session from './session';
import login from './login';
import store from './store';
import form from './form';

export default combineReducers({
  session,
  login,
  store,
  form,
});
