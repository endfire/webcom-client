import { createSelector } from 'reselect';

const getSessionID = (state) => state.session.get('id');
const getSessionField = (state) => state.session.get('field');
const getSignupErrors = (state) => state.signup.get('errors');

export const getIsUserAuthenticated = createSelector(
  [getSessionID, getSessionField],
  (sessionID, sessionField) => sessionField === 'user' && !!sessionID
);

export const getIsCompanyAuthenticated = createSelector(
  [getSessionID, getSessionField],
  (sessionID, sessionField) => sessionField === 'company' && !!sessionID
);

export const getLastSignupError = createSelector(
  [getSignupErrors],
  (errors) => errors.last(),
);
