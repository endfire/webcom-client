import { createSelector } from 'reselect';
import moment from 'moment';

const getStore = (state) => state.store;

const getAds = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'ads'])
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

const getCompanies = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'companies'])
);

export const getCategoryObgAds = createSelector(
  [getAds],
  (ads) => ads.filter(ad => (
    moment().isAfter(ad.get('start')) && moment().isBefore(ad.get('end'))
  ))
);

export const getCurrentBrand = (brandID) => (
  createSelector(
    [getBrands],
    (brands) => brands.get(brandID)
  )
);

export const getCategorySelectOptions = (brandID) => (
  createSelector(
    [getCategories],
    (categories) => categories.filter(category => (
      category.get('brand') === brandID
    )).map(category => ({
      value: category.get('id'),
      label: category.get('name'),
      brand: category.get('brand'),
    })).sortBy(category => (
      category.label
    ))
    .toArray()
  )
);

export const getCategoryObgListings = createSelector(
  [getListings, getCompanies],
  (listings, companies) => listings.map(listing => ({
    company: companies.get(listing.get('company')),
    categories: listing.get('categories'),
  }))
);
