import { createSelector } from 'reselect';

const getStore = (state) => state.store;
const getSessionID = (state) => state.session.get('id');
const getSessionField = (state) => state.session.get('field');

export const getLoggedInUser = createSelector(
  [getSessionID, getStore],
  (sessionID, store) => store.getIn(['entities', 'users', sessionID])
);

export const getLoggedInCompany = createSelector(
  [getSessionID, getStore],
  (sessionID, store) => store.getIn(['entities', 'companies', sessionID])
);

export const isUserAuthenticated = createSelector(
  [getSessionID, getSessionField],
  (sessionID, sessionField) => sessionField === 'user' && !!sessionID
);

export const isCompanyAuthenticated = createSelector(
  [getSessionID, getSessionField],
  (sessionID, sessionField) => sessionField === 'company' && !!sessionID
);
