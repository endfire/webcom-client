import { Map } from 'immutable';
import {
  INITIALIZE_FORM_SUCCESS,
  UPDATE_FORM_SUCCESS,
  CURRENT_FORM_CHANGE,
  REVERT_FORM,
} from '../actionTypes';

const init = Map({
  original: Map(),
  current: Map(),
});

export default (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case INITIALIZE_FORM_SUCCESS:
      return state
        .set('original', payload)
        .set('current', payload);

    case UPDATE_FORM_SUCCESS:
      return state.set('original', state.get('current'));

    case CURRENT_FORM_CHANGE:
      return state.setIn(['current', payload.key], payload.value);

    case REVERT_FORM:
      return state.set('current', state.get('original'));

    default:
      return state;
  }
};
