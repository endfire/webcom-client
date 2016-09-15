import store from 'configureStore';
import { Map } from 'immutable';
import {
  getCurrentFormName,
  getCurrentFormDidPublish,
  getCurrentFormFields,
  getCurrentFormPayment,
} from 'selectors/dynamicForm';

export default (formID) => {
  const state = store.getState();

  const name = getCurrentFormName(formID)(state);
  const didPublish = getCurrentFormDidPublish(formID)(state);
  const fields = getCurrentFormFields(formID)(state);
  const payment = getCurrentFormPayment(formID)(state);

  return Map({
    name,
    didPublish,
    fields,
    payment,
  });
};
