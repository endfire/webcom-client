import { createSelector } from 'reselect';

const getStore = (state) => state.store;
const getSessionID = (state) => state.session.get('id');
const getSessionType = (state) => state.session.get('type');

export const getLoggedInUser = createSelector(
  [getSessionID, getStore],
  (sessionID, store) => store.getIn(['entities', 'users', sessionID])
);

export const getLoggedInCompany = createSelector(
  [getSessionID, getStore],
  (sessionID, store) => store.getIn(['entities', 'companies', sessionID])
);

export const isUserAuthenticated = createSelector(
  [getSessionID, getSessionType],
  (sessionID, sessionType) => sessionType === 'user' && !!sessionID
);

export const isCompanyAuthenticated = createSelector(
  [getSessionID, getSessionType],
  (sessionID, sessionType) => sessionType === 'company' && !!sessionID
);
