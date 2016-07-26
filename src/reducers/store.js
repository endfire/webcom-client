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
    submissions: {},
    fields: {},
    forms: {},
    people: {},
    users: {},
  },
  isLoading: {
    CREATE: false,
    FIND: false,
    FETCH: false,
    UPDATE: false,
    DELETE: false,
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
      const { requests, isLoading } = state;
      const { payload } = action;

      return {
        ...state,
        requests: {
          ...requests,
          [verb]: requests[verb].concat(payload),
        },
        isLoading: {
          ...isLoading,
          [verb]: true,
        },
      };
    }
    case 'SUCCESS': {
      const { successes, entities, isLoading } = state;
      const { payload } = action;

      const entitiesObject = {};
      Object.keys(payload.entities).forEach(field => {
        entitiesObject[field] = {
          ...entities[field],
          ...payload.entities[field],
        };
      });

      return {
        ...state,
        entities: {
          ...entities,
          ...entitiesObject,
        },
        successes: {
          ...successes,
          [verb]: successes[verb].concat(payload),
        },
        isLoading: {
          ...isLoading,
          [verb]: false,
        },
      };
    }
    case 'ERROR': {
      const { errors, isLoading } = state;
      const { payload } = action;

      return {
        ...state,
        errors: {
          ...errors,
          [verb]: errors[verb].concat(payload),
        },
        isLoading: {
          ...isLoading,
          [verb]: false,
        },
      };
    }
    default:
      return state;
  }
};

export default store;
