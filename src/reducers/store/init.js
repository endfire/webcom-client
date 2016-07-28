import { Map, List } from 'immutable';

const verbs = Map({
  CREATE: List(),
  FIND: List(),
  FETCH: List(),
  UPDATE: List(),
  DELETE: List(),
});

export default Map({
  requests: verbs,
  successes: verbs,
  errors: verbs,
  entities: Map({
    ads: Map(),
    brands: Map(),
    categories: Map(),
    companies: Map(),
    submissions: Map(),
    fields: Map(),
    forms: Map(),
    people: Map(),
    users: Map(),
  }),
  isLoading: Map({
    CREATE: false,
    FIND: false,
    FETCH: false,
    UPDATE: false,
    DELETE: false,
  }),
});
