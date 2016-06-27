// CREATE_REQUEST
// FIND_REQUEST
// FETCH_REQUEST
// UPDATE_REQUEST
// DELETE_REQUEST
// CREATE_ERROR
// FIND_ERROR
// FETCH_ERROR
// UPDATE_ERROR
// DELETE_ERROR
// CREATE_SUCCESS
// FIND_SUCCESS
// FETCH_SUCCESS
// UPDATE_SUCCESS
// DELETE_SUCCESS
const init = {
  requests: {
    CREATE: [],
    FIND: [],
    FETCH: [],
    UPDATE: [],
    DELETE: [],
  },
  successes: {
    CREATE: [],
    FIND: [],
    FETCH: [],
    UPDATE: [],
    DELETE: [],
  },
  errors: {
    CREATE: [],
    FIND: [],
    FETCH: [],
    UPDATE: [],
    DELETE: [],
  },
  result: {},
  entities: {
    ads: {},
    brands: {},
    categories: {},
    companies: {},
    forms: {},
    headings: {},
    listings: {},
    obgs: {},
    people: {},
    users: {},
  },
};

// VERB_STATUS

const getActionStatus = (action) => action.type.split('_')[1];
const getActionVerb = (action) => action.type.split('_')[0];

const store = (state = init, action) => {
  const status = getActionStatus(action);
  const verb = getActionVerb(action);

  switch (status) {
    case 'REQUEST': {
      const requests = state.requests;

      return {
        ...state,
        requests: {
          ...requests,
          [verb]: requests[verb].concat(action.payload),
        },
      };
    }
    case 'SUCCESS': {
      const successes = state.successes;

      const entities = {
        ...state.entities,
        ...action.payload.entities,
      };

      return {
        ...state,
        entities: {
          ...entities,
        },
        successes: {
          ...successes,
          [verb]: successes[verb].concat(action.payload),
        },
      };
    }
    case 'ERROR': {
      const errors = state.errors;

      return {
        ...state,
        errors: {
          ...errors,
          [verb]: errors[verb].concat(action.payload),
        },
      };
    }
    default:
      return state;
  }
};

export default store;
