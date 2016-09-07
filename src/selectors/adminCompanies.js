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
    label: category.get('name'),
    brand: category.get('brand'),
  })).toArray()
);

/*
export const getAds = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'ads'])
);
*/
