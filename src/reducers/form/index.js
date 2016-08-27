import { Map } from 'immutable';
import isValueValid from './isValueValid';
import mapInitialValuesToValues from './mapInitialValuesToValues';
import * as types from 'constants/actionTypes';

const init = Map({
  error: null,
});

export default (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.INITIALIZE_FORM: {
      const { form, initialValues, validation } = payload;
      const values = mapInitialValuesToValues(initialValues, validation);

      return state
        .setIn([form, 'initial'], values)
        .setIn([form, 'current'], values);
    }

    case types.REVERT_FORM: {
      const { form } = payload;

      return state.setIn([form, 'current'], state.getIn([form, 'initial']));
    }

    case types.CHANGE_FORM: {
      const { form, name, value, validation } = payload;
      const isValid = isValueValid(name, value, validation);
      const isDirty = state.getIn([form, 'current']) === state.getIn([form, 'initial']);

      return state
        .setIn([form, 'isDirty'], isDirty)
        .setIn([form, 'current', name], Map({
          isTouched: true,
          value,
          isValid,
        }));
    }

    case types.SUBMIT_FORM_REQUEST: {
      const { form } = payload;

      return state.setIn([form, 'isSubmitting'], true);
    }

    case types.SUBMIT_FORM_SUCCESS: {
      const { form } = payload;

      return state
        .setIn([form, 'isSubmitting'], false)
        .set('error', null);
    }

    case types.SUBMIT_FORM_ERROR: {
      const { form, err } = payload;

      return state
        .setIn([form, 'isSubmitting'], false)
        .set('error', err);
    }

    default:
      return state;
  }
};
