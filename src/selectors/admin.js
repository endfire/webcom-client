import { createSelector } from 'reselect';

const getSession = (state) => state.session;
const getForms = (state) => state.store.getIn(['entities', 'forms']);

export const getUserRole = createSelector(
  [getSession],
  (session) => session.get('role')
);

export const getCurrentBrandForms = (brandID) => (
  createSelector(
    [getForms],
    (forms) => forms.filter(val => val.get('brand') === brandID)
  )
);
