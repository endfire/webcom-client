import { createSelector } from 'reselect';

const getStore = (state) => state.store;

export const getIsDeleteLoading = createSelector(
  [getStore],
  (store) => store.getIn(['isLoading', 'DELETE'])
);

export const getIsCreateLoading = createSelector(
  [getStore],
  (store) => store.getIn(['isLoading', 'CREATE'])
);

export const getIsUpdateLoading = createSelector(
  [getStore],
  (store) => store.getIn(['isLoading', 'UPDATE'])
);
