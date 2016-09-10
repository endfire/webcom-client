import { createSelector } from 'reselect';

const getStore = (state) => state.store;

const getAds = createSelector(
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
    })).toArray()
  )
);

export const getCategoryObgListings = createSelector(
  [getListings],
  (listings) => listings.map(listing => ({
    brand: listing.get('brand'),
  }))
);

export const getCategoryObgAds = createSelector(
  [getAds],
  (ads) => ads.map(ad => ({
    brand: ad.get('brand'),
  }))
);
