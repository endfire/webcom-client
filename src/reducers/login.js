import { Map, List } from 'immutable';
import * as types from 'constants/actionTypes';

const init = Map({
  isLoading: false,
  isInvalid: false,
  requests: List(),
  errors: List(),
  successes: List(),
  form: Map({
    email: '',
    password: '',
  }),
});

export default (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_FORM_CHANGE:
      return state.setIn(['form', payload.key], payload.value);

    case types.LOGIN_REQUEST:
      return state
        .set('isLoading', true)
        .set('isInvalid', false)
        .update('requests', requests => requests.push(Map(payload)));

    case types.LOGIN_SUCCESS:
      return state
        .set('isLoading', false)
        .set('isInvalid', false)
        .setIn(['form', 'email'], '')
        .setIn(['form', 'password'], '')
        .update('successes', successes => successes.push(payload));

    case types.LOGIN_ERROR:
      return state
        .set('isLoading', false)
        .set('isInvalid', true)
        .update('errors', errors => errors.push(payload));

    default:
      return state;
  }
};
