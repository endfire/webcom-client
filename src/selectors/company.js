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

const getCategories = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'categories'])
);

export const getSessionID = (state) => state.session.get('id');

export const getCurrentBrandCategories = (brandId) => (
  createSelector(
    [getCategories],
    (categories) => categories.filter(category => (
      category.get('brand') === brandId
    )).map(item => ({
      value: item.get('id'),
      label: item.get('name'),
    })).toArray()
  )
);

export const getNonDeletedPeople = (companyID) => (
  createSelector(
    [getPeople],
    (people) => people.filter(val =>
      (val.get('meta') && !val.getIn(['meta', 'archived'])) && val.get('company') === companyID
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
    value: brand.get('id'),
    label: brand.get('name'),
  })).toArray()
);
