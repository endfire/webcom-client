import { createSelector } from 'reselect';

const getStore = (state) => state.store;

const getFields = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'fields'])
);

const getPayments = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'payments'])
);

const getItems = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'items'])
);

const getForms = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'forms'])
);

export const getCurrentForm = (formID) => (
  createSelector(
    [getForms],
    (forms) => forms.get(formID)
  )
);

export const getCurrentFormName = (formID) => (
  createSelector(
    [getForms],
    (forms) => forms.getIn([formID, 'name'])
  )
);

export const getCurrentFormDidPublish = (formID) => (
  createSelector(
    [getForms],
    (forms) => forms.getIn([formID, 'didPublish'])
  )
);

export const getCurrentFormFields = (formID) => (
  createSelector(
    [getFields],
    (fields) => fields.filter(val => val.get('form') === formID)
  )
);

export const getCurrentFormPayment = (formID) => (
  createSelector(
    [getPayments],
    (payments) => payments.filter(val => val.get('form') === formID)
  )
);

export const getCurrentFormPaymentItems = (formID) => (
  createSelector(
    [getItems, getForms],
    (items, forms) => {
      const currentFormPaymentID = forms.getIn([formID, 'payment']);

      return items.filter(val => val.get('payment') === currentFormPaymentID);
    }
  )
);
