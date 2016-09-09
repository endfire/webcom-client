import { createSelector } from 'reselect';

const getStore = (state) => state.store;

export const getBrands = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'brands'])
);

export const getCurrentBrand = (brandID) => (
  createSelector(
    [getBrands],
    (brands) => brands.get(brandID)
  )
);

const getCategories = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'categories'])
);

export const getCurrentBrandCategories = (brandID) => (
  createSelector(
    [getCategories],
    (categories) => categories.filter(val => val.get('brand') === brandID)
  )
);

const getForms = createSelector(
  [getStore],
  (store) => store.getIn(['entities', 'forms'])
);

export const getCurrentBrandForms = (brandID) => (
  createSelector(
    [getForms],
    (forms) => forms.filter(val => val.get('brand') === brandID)
  )
);
