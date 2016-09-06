import { createSelector } from 'reselect';

const getStore = (state) => state.store;

export const getCompanies = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'companies'])
);

export const getCurrentCompany = (companyID) => (
  createSelector(
    [getCompanies],
    (companies) => companies.get(companyID)
  )
);

const getPeople = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'people'])
);

export const getCurrentCompanyPeople = (companyID) => (
  createSelector(
    [getPeople],
    (people) => people.filter(val => val.get('company') === companyID)
  )
);

/*
export const getAds = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'ads'])
);
*/
