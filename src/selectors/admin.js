import { createSelector } from 'reselect';

const getStore = (state) => state.store;
const getForms = (state) => state.store.getIn(['entities', 'forms']);
const getSessionID = (state) => state.session.get('id');

export const getCurrentBrandForms = (brandID) => (
  createSelector(
    [getForms],
    (forms) => forms.filter(val => val.get('brand') === brandID)
  )
);

export const getUserRole = createSelector(
  [getSessionID, getStore],
  (sessionID, store) => store.getIn(['entities', 'users', sessionID, 'role'])
);
