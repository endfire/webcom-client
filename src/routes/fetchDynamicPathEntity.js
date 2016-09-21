import * as actions from 'actions/store';

export default (store, api, entity, dynamicPath) => (nextState, replace, callback) => {
  const id = nextState.params[dynamicPath];
  const done = () => callback();

  return api.fetch(entity, id)
    .then((record) => store.dispatch(actions.syncStore(entity, record)))
    .then(done)
    .catch(done);
};