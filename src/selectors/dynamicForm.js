import { createSelector } from 'reselect';
import { Map } from 'immutable';

const getStore = (state) => state.store;

const getBrands = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'brands'])
);

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

export const getCurrentFormBrand = (formID) => (
  createSelector(
    [getForms, getBrands],
    (forms, brands) => brands.get(
      forms.getIn([formID, 'brand'])
    )
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

export const getCurrentFormRecipients = (formID) => (
  createSelector(
    [getForms],
    (forms) => Map({
      recipientOne: forms.getIn([formID, 'recipientOne'])
        || 'infowebcomcommunications@gmail.com',
      recipientTwo: forms.getIn([formID, 'recipientTwo'])
        || 'infowebcomcommunications@gmail.com',
      recipientThree: forms.getIn([formID, 'recipientThree'])
        || 'infowebcomcommunications@gmail.com',
    })
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
