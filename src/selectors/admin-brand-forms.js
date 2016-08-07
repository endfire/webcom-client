import { createSelector } from 'reselect';

const getForms = (state) => state.store.getIn(['entities', 'forms']);

export const getCurrentBrandForms = (brandID) => (
  createSelector(
    [getForms],
    (forms) => forms.filter(val => val.get('brand') === brandID)
  )
);
