import { createSelector } from 'reselect';

const getStore = (state) => state.store;

export const getFormFields = (form) => (
  createSelector(
    [getStore],
    (store) => form.get('fields')
      .map(field => store.getIn(['entities', 'fields', field]))
  )
);

export const getFormPayment = (form) => (
  createSelector(
    [getStore],
    (store) => store.getIn(['entities', 'payments', form.get('payment')])
  )
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
