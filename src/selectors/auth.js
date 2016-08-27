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

export const getIsUserAuthenticated = createSelector(
  [getSessionID, getSessionField],
  (sessionID, sessionField) => sessionField === 'user' && !!sessionID
);

export const getIsCompanyAuthenticated = createSelector(
  [getSessionID, getSessionField],
  (sessionID, sessionField) => sessionField === 'company' && !!sessionID
);
