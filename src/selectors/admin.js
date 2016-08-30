import { createSelector } from 'reselect';

const getUserRole = (state) => state.session.get('role');

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
