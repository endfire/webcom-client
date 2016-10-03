import * as actions from 'actions/store';

export default (store, api, entity, dynamicPath) => (nextState, replace, callback) => {
  const id = dynamicPath ? nextState.params[dynamicPath] : localStorage.id;
  const done = (m) => {
    console.log('done', m);
    return callback();
  };

  return api.fetch(entity, id)
    .then((record) => store.dispatch(actions.syncStore(entity, record)))
    .then(done)
    .catch(done);
};
