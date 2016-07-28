import init from './init';

const getActionStatus = (action) => action.type.split('_')[1];
const getActionVerb = (action) => action.type.split('_')[0];

const store = (state = init, action) => {
  const status = getActionStatus(action);
  const verb = getActionVerb(action);
  const { payload } = action;

  switch (status) {
    case 'REQUEST': {
      return state
        .updateIn(['requests', verb], requests => requests.push(payload))
        .setIn(['isLoading', verb], true);
    }
    case 'SUCCESS': {
      if (verb === 'DELETE') {
        // assuming the first key of the normalized entities is the deleted field...
        const field = Object.keys(payload.entities)[0];
        // assuming you can only delete one record at a time...
        const key = Object.keys(payload.entities[field])[0];

        return state
          .deleteIn(['entities', field, key])
          .updateIn(['successes', verb], successes => successes.push(payload))
          .setIn(['isLoading', verb], false);
      }

      return state
        .mergeDeepIn(['entities'], payload.entities)
        .updateIn(['successes', verb], successes => successes.push(payload))
        .setIn(['isLoading', verb], false);
    }
    case 'ERROR': {
      return state
      .updateIn(['errors', verb], errors => errors.push(payload))
      .setIn(['isLoading', verb], false);
    }
    default:
      return state;
  }
};

export default store;
