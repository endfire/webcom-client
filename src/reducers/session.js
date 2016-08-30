import { Map } from 'immutable';
import * as types from 'constants/actionTypes';

const init = Map({
  id: '',
  field: '',
  role: '',
});

export default (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.VERIFY_TOKEN:
      return state
        .set('id', payload.id)
        .set('field', payload.field)
        .set('role', payload.role);

    case types.LOGIN_SUCCESS:
      return state
        .set('id', payload.id)
        .set('field', payload.field)
        .set('role', payload.role);

    default:
      return state;
  }
};
