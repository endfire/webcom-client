import { createSelector } from 'reselect';

const getForms = (state) => state.store.getIn(['entities', 'forms']);
const getUserRole = (state) => state.session.get('role');

export const getCanUserDelete = createSelector(
  [getUserRole],
  (userRole) => userRole === '1'
);

export const getCanUserAddUsers = createSelector(
  [getUserRole],
  (userRole) => userRole === '1' || userRole === '2'
);

export const getCurrentBrandForms = (brandID) => (
  createSelector(
    [getForms],
    (forms) => forms.filter(val => val.get('brand') === brandID)
  )
);
