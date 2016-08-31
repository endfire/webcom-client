import init from './init';
import * as definitions from 'services/api/definitions';
import { normalize, arrayOf } from 'normalizr';
import * as types from 'constants/actionTypes';

const getActionStatus = (action) => action.type.split('_')[1];
const getActionVerb = (action) => action.type.split('_')[0];
const allowedVerbs = ['CREATE', 'FIND', 'FETCH', 'RELATED', 'UPDATE', 'DELETE'];

export default (state = init, action) => {
  const status = getActionStatus(action);
  const verb = getActionVerb(action);
  const { type, payload } = action;

  if (type === types.SYNC_STORE) {
    if (payload.shouldRemove) return state.deleteIn(['entities', payload.type, payload.record.id]);

    let entities;

    if (payload.hasOwnProperty('records')) {
      entities = normalize(
        payload.records,
        arrayOf(definitions[payload.type]),
      );
    } else if (payload.hasOwnProperty('record')) {
      entities = normalize(
        payload.record,
        definitions[payload.type],
      );
    } else {
      throw new Error(
        'Tried syncing the store with undefined `record` and undefined `records`.'
      );
    }

    return state.mergeDeep(entities);
  }

  if (!allowedVerbs.includes(verb)) return state;

  switch (status) {
    case 'REQUEST':
      return state
        .updateIn(['requests', verb], requests => requests.push(payload))
        .setIn(['isLoading', verb], true);

    case 'SUCCESS':
      return state
        .updateIn(['successes', verb], successes => successes.push(payload))
        .setIn(['isLoading', verb], false);

    case 'ERROR':
      return state
        .updateIn(['errors', verb], errors => errors.push(payload))
        .setIn(['isLoading', verb], false);

    default:
      return state;
  }
};
