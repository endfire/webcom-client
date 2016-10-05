import * as actions from 'actions/store';

export default (store, api, entity, dynamicPath, options = {}) =>
  (nextState, replace, callback) => {
    const id = dynamicPath ? nextState.params[dynamicPath] : localStorage.id;
    const done = () => callback();

    return api.fetch(entity, id, options)
    .then((record) => store.dispatch(actions.syncStore(entity, record)))
    .then(done)
    .catch(done);
  };
