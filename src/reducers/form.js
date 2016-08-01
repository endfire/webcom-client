import { Map } from 'immutable';
import {
  INITIALIZE_FORM_SUCCESS,
  UPDATE_FORM_SUCCESS,
  CHANGE_CURRENT_FORM,
  REVERT_FORM,
} from '../actionTypes';

const init = Map({
  original: Map(),
  current: Map(),
});

export default (state = init, action) => {
  switch (action.type) {
    case INITIALIZE_FORM_SUCCESS:
      return state
        .set('original', action.payload)
        .set('current', action.payload);
    case UPDATE_FORM_SUCCESS:
      return state
        .set('original', state.get('current'));
    case CHANGE_CURRENT_FORM:
      return state
        .setIn(['current', action.payload.key], action.payload.value);
    case REVERT_FORM:
      return state
        .set('current', state.get('original'));
    default:
      return state;
  }
};
