import { Map } from 'immutable';
import {
  VERIFY_TOKEN,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../actionTypes';

const init = Map({
  id: '',
  type: '',
});

export default (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case VERIFY_TOKEN:
      return state
        .set('id', payload.id)
        .set('type', payload.type);

    case LOGIN_SUCCESS:
      return state
        .set('id', payload.id)
        .set('type', payload.type);

    case LOGOUT_SUCCESS:
      return state
        .set('id', '')
        .set('type', '');

    default:
      return state;
  }
};
