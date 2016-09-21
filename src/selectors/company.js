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

export const getCompanyPeople = createSelector(
  [getPeople, getSessionID],
  (people, companyID) => people.filter(person => (
    person.get('company') === companyID
  ))
);

export const getCompanyListings = createSelector(
  [getListings, getSessionID],
  (listings, companyID) => listings.filter(listing => (
    listing.get('company') === companyID
  ))
);

export const getLoggedInCompany = createSelector(
  [getSessionID, getStore],
  (sessionID, store) => store.getIn(['entities', 'companies', sessionID])
);

export const getBrandSelectOptions = createSelector(
  [getBrands],
  (brands) => brands.filter(brand => (
    brand.get('obg') === true
  )).map(brand => ({
    value: brand.get('id'),
    label: brand.get('name'),
  })).toArray()
);

export const getCategorySelectOptions = createSelector(
  [getCategories],
  (categories) => categories.map(category => ({
    value: category.get('id'),
    label: `${category.get('heading')} - ${category.get('name')}`,
    brand: category.get('brand'),
  })).sortBy(category => (
    category.label
  )).toArray()
);
