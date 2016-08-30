import { createSelector } from 'reselect';

const getStore = (state) => state.store;
const getUserRole = (state) => state.session.get('role');
const getForms = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'forms'])
);

export const getCurrentBrand = (brandID) => (
  createSelector(
    [getStore],
    (store) => store.getIn(['entities', 'brands', brandID])
  )
);

export const getCurrentBrandForms = (brandID) => (
  createSelector(
    [getForms],
    (forms) => forms.filter(val => val.get('brand') === brandID)
  )
);

export const getCanUserDelete = createSelector(
  [getUserRole],
  (userRole) => userRole === '1'
);

export const getCanUserAddUsers = createSelector(
  [getUserRole],
  (userRole) => userRole === '1' || userRole === '2'
);

export const getCanUserAccessOBG = createSelector(
  [getUserRole],
  (userRole) => userRole === '1' || userRole === '2'
);
