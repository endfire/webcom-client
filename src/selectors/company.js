import { createSelector } from 'reselect';

const getStore = (state) => state.store;
const getPeople = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'people'])
);

export const getSessionID = (state) => state.session.get('id');

export const getNonDeletedPeople = (companyID) => (
  createSelector(
    [getPeople],
    (people) => people.filter(val => (
      val.get('meta') && !val.getIn(['meta', 'archived'])) && val.get('company') === companyID
    )
  )
);

export const getLoggedInCompany = createSelector(
  [getSessionID, getStore],
  (sessionID, store) => store.getIn(['entities', 'companies', sessionID])
);
