/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import session from './session';
import login from './login';
import store from './store';
import form from './form';
import signup from './signup';
import * as types from 'constants/actionTypes';

const appReducer = combineReducers({
  session,
  login,
  store,
  form,
  signup,
});

export default (state, action) => {
  if (action.type === types.LOGOUT_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};
