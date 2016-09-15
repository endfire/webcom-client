import init from './init';
import { mapFormIDToValues, mapFormIDToItems } from './utils';
import * as types from 'constants/actionTypes';

export default (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.HYDRATE_SUBMISSION_FORM: {
      const { formID } = payload;
      const values = mapFormIDToValues(formID);

      return state
        .setIn([formID, 'name'], values.get('name'))
        .setIn([formID, 'didPublish'], values.get('didPublish'))
        .setIn([formID, 'fields'], values.get('fields'))
        .setIn([formID, 'payment'], values.get('payment'));
    }

    case types.HYDRATE_SUBMISSION_FORM_ITEMS: {
      const { formID } = payload;

      const items = mapFormIDToItems(formID);

      return state
        .setIn([formID, 'items'], items);
    }

    case types.EDIT_SUBMISSION_FORM: {
      const { formID, name, value } = payload;

      return state
        .setIn([formID, 'fields', name, 'value'], value);
    }

    case types.SUBMIT_SUBMISSION_FORM: {
      return state
        .update('submissions', submissions => submissions.push(payload));
    }

    case types.INITIALIZE_SUBMISSION_FORM_REQUEST: {
      return state
        .updateIn(['requests', 'submissionForm'], requests => requests.push(payload));
    }

    case types.INITIALIZE_SUBMISSION_FORM_ITEMS_REQUEST: {
      return state
        .updateIn(['requests', 'submissionFormItems'], requests => requests.push(payload));
    }

    case types.INITIALIZE_SUBMISSION_FORM_ERROR: {
      return state
        .updateIn(['errors', 'submissionForm'], errors => errors.push(payload));
    }

    case types.INITIALIZE_SUBMISSION_FORM_ITEMS_ERROR: {
      return state
        .updateIn(['errors', 'submissionFormItems'], errors => errors.push(payload));
    }

    case types.INITIALIZE_SUBMISSION_FORM_SUCCESS: {
      return state
        .updateIn(['successes', 'submissionForm'], successes => successes.push(payload));
    }

    case types.INITIALIZE_SUBMISSION_FORM_ITEMS_SUCCESS: {
      return state
        .updateIn(['successes', 'submissionFormItems'], successes => successes.push(payload));
    }

    default:
      return state;
  }
};
