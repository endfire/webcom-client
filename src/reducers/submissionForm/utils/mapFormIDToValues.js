import store from 'configureStore';
import { Map } from 'immutable';
import {
  getCurrentFormName,
  getCurrentFormPublished,
  getCurrentFormFields,
  getCurrentFormPayment,
} from 'selectors/dynamicForm';

export default (formID) => {
  const state = store.getState();

  const name = getCurrentFormName(formID)(state);
  const published = getCurrentFormPublished(formID)(state);
  const fields = getCurrentFormFields(formID)(state);
  const payment = getCurrentFormPayment(formID)(state);

  return Map({
    name,
    published,
    fields,
    payment,
  });
};
