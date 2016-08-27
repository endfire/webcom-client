/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import session from './session';
import login from './login';
import store from './store';
import form from './form';
import { LOGOUT_SUCCESS } from '../actionTypes';

const appReducer = combineReducers({
  session,
  login,
  store,
  form,
});

export default (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};
