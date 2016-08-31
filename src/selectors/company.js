import { createSelector } from 'reselect';

const getStore = (state) => state.store;
const getPeople = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'people'])
);

const getListings = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'listings'])
);

const getBrands = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'brands'])
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

export const getCompanyListings = createSelector(
  [getListings, getLoggedInCompany],
  (listings, company) => listings.filter(listing => (
    company.get('listings').includes(listing.get('id'))
  ))
);

export const getBrandSelectOptions = createSelector(
  [getBrands],
  (brands) => brands.map(brand => ({
    value: brand.id,
    label: brand.name,
  }))
);
