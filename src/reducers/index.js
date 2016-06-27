import { combineReducers } from 'redux';
import session from './session';
import store from './store';

export default combineReducers({
  session,
  store,
});
