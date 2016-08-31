import { Map } from 'immutable';
import getNextFormState from './getNextFormState';
import * as types from 'constants/actionTypes';
import init, { initField, initPassword } from './init';

export default (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SIGNUP_FORM_CHANGE:
      return getNextFormState(state, action);

    case types.SIGNUP_REQUEST:
      return state
        .set('isLoading', true)
        .update('requests', requests => requests.push(Map(payload)));

    case types.SIGNUP_ERROR:
      return state
        .set('isLoading', false)
        .update('errors', errors => errors.push(payload));

    case types.SIGNUP_SUCCESS:
      return state
        .set('isLoading', false)
        .set('id', payload.id)
        .set('field', payload.field)
        .set('role', payload.role)
        .setIn(['form', 'name'], initField('name'))
        .setIn(['form', 'email'], initField('email'))
        .setIn(['form', 'confirm'], initField('confirm'))
        .setIn(['form', 'password'], initPassword())
        .update('successes', successes => successes.push(Map(payload)));

    default:
      return state;
  }
};
