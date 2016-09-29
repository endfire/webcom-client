import { Map, List } from 'immutable';
import { mapFormIDToValues, mapFormIDToItems } from './utils';
import * as types from 'constants/actionTypes';

const init = Map({
  submissions: List(),
  errors: List(),
});

export default (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.HYDRATE_SUBMISSION_FORM: {
      const { formID } = payload;
      const values = mapFormIDToValues(formID);

      return state
        .setIn([formID, 'recipientOne'], values.get('recipientOne'))
        .setIn([formID, 'recipientTwo'], values.get('recipientTwo'))
        .setIn([formID, 'recipientThree'], values.get('recipientThree'))
        .setIn([formID, 'name'], values.get('name'))
        .setIn([formID, 'didPublish'], values.get('didPublish'))
        .setIn([formID, 'fields'], values.get('fields'))
        .setIn([formID, 'payment'], values.get('payment'))
        .setIn([formID, 'form'], formID);
    }

    case types.HYDRATE_SUBMISSION_FORM_ITEMS: {
      const { formID } = payload;

      const items = mapFormIDToItems(formID);

      return state.setIn([formID, 'items'], items);
    }

    case types.EDIT_SUBMISSION_FORM_FIELD: {
      const { formID, name, value } = payload;

      return state.setIn([formID, 'fields', name, 'value'], value);
    }

    case types.EDIT_SUBMISSION_FORM_CHECKBOX: {
      const { formID, name, value } = payload;
      const field = state.getIn([formID, 'fields', name]);

      if (!field.get('flags')) {
        return state
          .setIn([formID, 'fields', name, 'value'], List([value]))
          .setIn([formID, 'fields', name, 'flags'], List([value]));
      }

      const flags = state.getIn([formID, 'fields', name, 'flags']);

      if (flags.includes(value)) {
        const newValue = state
          .getIn([formID, 'fields', name, 'value'])
          .filterNot(val => val === value);

        const newFlags = state
          .getIn([formID, 'fields', name, 'flags'])
          .filterNot(val => val === value);

        return state
          .setIn([formID, 'fields', name, 'value'], newValue)
          .setIn([formID, 'fields', name, 'flags'], newFlags);
      }

      if (!flags.includes(value)) {
        const newValue = state
          .getIn([formID, 'fields', name, 'value'])
          .push(value);

        const newFlags = state
          .getIn([formID, 'fields', name, 'flags'])
          .push(value);

        return state
          .setIn([formID, 'fields', name, 'value'], newValue)
          .setIn([formID, 'fields', name, 'flags'], newFlags);
      }

      return state;
    }

    case types.EDIT_SUBMISSION_FORM_PAYMENT: {
      const { formID, name, value } = payload;

      return state.setIn([formID, 'payment', name], value);
    }

    case types.EDIT_SUBMISSION_FORM_ITEM: {
      const { formID, name, value } = payload;

      return state.setIn([formID, 'items', name, 'quantity'], value);
    }

    case types.SUBMIT_SUBMISSION_FORM: {
      return state.update('submissions', submissions => submissions.push(payload));
    }

    case types.SUBMIT_SUBMISSION_FORM_ERROR: {
      return state.update('errors', errors => errors.push(payload));
    }

    case types.SUBMIT_SUBMISSION_FORM_NO_ERROR: {
      return state.update('errors', errors => errors.push(null));
    }

    default:
      return state;
  }
};
