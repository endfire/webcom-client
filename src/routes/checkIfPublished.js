import * as actions from 'actions/store';
import { getCurrentFormDidPublish } from 'selectors/dynamicForm';

export default (store, api) => (nextState, replace, callback) => {
  const id = nextState.params.submissionFormID;
  const done = () => callback();

  return api.fetch('form', id)
    .then((record) => store.dispatch(actions.syncStore('form', record)))
    .then(() => {
      const state = store.getState();
      const currentFormDidPublish = getCurrentFormDidPublish(id)(state);

      if (!currentFormDidPublish) {
        replace('/not-published');
        return done();
      }

      return done();
    })
    .catch(done);
};
