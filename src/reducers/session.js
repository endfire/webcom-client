import { Map } from 'immutable';
import {
  VERIFY_TOKEN,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../actionTypes';

const init = Map({
  id: '',
  field: '',
});

export default (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case VERIFY_TOKEN:
      return state
        .set('id', payload.id)
        .set('field', payload.field);

    case LOGIN_SUCCESS:
      return state
        .set('id', payload.id)
        .set('field', payload.field);

    case LOGOUT_SUCCESS:
      return state
        .set('field', '')
        .set('id', '');

    default:
      return state;
  }
};
