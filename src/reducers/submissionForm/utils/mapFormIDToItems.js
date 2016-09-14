import store from 'configureStore';
import { getCurrentFormPaymentItems } from 'selectors/dynamicForm';

export default (formID) => {
  const state = store.getState();
  const items = getCurrentFormPaymentItems(formID)(state);

  return items;
};
