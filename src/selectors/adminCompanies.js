import { createSelector } from 'reselect';

const getStore = (state) => state.store;

export const getCompaniesByName = (name) => (
  createSelector(
    [getStore],
    (store) => store.getIn(['entities', 'companies']).filter(company => (
      company.get('name').substring(0, name.length) === name
    ))
  )
);

const getCompanies = createSelector(
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

const getListings = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'listings'])
);

const getAds = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'ads'])
);

export const getCurrentCompanyPeople = (companyID) => (
  createSelector(
    [getPeople],
    (people) => people.filter(val => val.get('company') === companyID)
  )
);

export const getCurrentCompanyListings = (companyID) => (
  createSelector(
    [getListings],
    (listings) => listings.filter(listing => listing.get('company') === companyID)
  )
);

export const getCurrentCompanyAds = (companyID) => (
  createSelector(
    [getAds],
    (ads) => ads.filter(ad => ad.get('company') === companyID)
  )
);
