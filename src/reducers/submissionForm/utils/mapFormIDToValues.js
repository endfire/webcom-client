import store from 'configureStore';
import { Map } from 'immutable';
import {
  getCurrentFormName,
  getCurrentFormDidPublish,
  getCurrentFormFields,
  getCurrentFormPayment,
  getCurrentFormRecipients,
  getCurrentFormBrand,
  getCurrentFormToggle,
} from 'selectors/dynamicForm';

export default (formID) => {
  const state = store.getState();

  const brand = getCurrentFormBrand(formID)(state);
  const name = getCurrentFormName(formID)(state);
  const didPublish = getCurrentFormDidPublish(formID)(state);
  const fields = getCurrentFormFields(formID)(state);
  const payment = getCurrentFormPayment(formID)(state);
  const recipients = getCurrentFormRecipients(formID)(state);
  const toggleHeading = getCurrentFormToggle(formID)(state);

  return Map({
    recipientOne: recipients.get('recipientOne'),
    recipientTwo: recipients.get('recipientTwo'),
    recipientThree: recipients.get('recipientThree'),
    payment: payment.set('country', 'United States'),
    name,
    didPublish,
    fields,
    brand,
    toggleHeading,
  });
};
