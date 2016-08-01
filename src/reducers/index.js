import { combineReducers } from 'redux';
import session from './session';
import store from './store';
import form from './form';

export default combineReducers({
  session,
  store,
  form,
});
