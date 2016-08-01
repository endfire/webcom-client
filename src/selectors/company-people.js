import { createSelector } from 'reselect';

const getPeople = (state) => state.store.getIn(['entities', 'people']);

export const getNonDeletedPeople = createSelector(
  [getPeople],
  (people) => people.filter(val => val.get('meta') && !val.getIn(['meta', 'archived']))
);
