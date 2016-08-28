import { createSelector } from 'reselect';

const getSessionID = (state) => state.session.get('id');
const getSessionField = (state) => state.session.get('field');

export const getIsUserAuthenticated = createSelector(
  [getSessionID, getSessionField],
  (sessionID, sessionField) => sessionField === 'user' && !!sessionID
);

export const getIsCompanyAuthenticated = createSelector(
  [getSessionID, getSessionField],
  (sessionID, sessionField) => sessionField === 'company' && !!sessionID
);
