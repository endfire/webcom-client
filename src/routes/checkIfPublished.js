import * as actions from 'actions/store';
import * as subActions from 'actions/submissionForm';
import { getCurrentFormDidPublish } from 'selectors/dynamicForm';

export default (store, api) => (nextState, replace, callback) => {
  const id = nextState.params.submissionFormID;
  const done = () => callback();

  return api.fetch('form', id)
    .then((record) => store.dispatch(actions.syncStore('form', record)))
    .then(() => {
      const currentFormDidPublish = getCurrentFormDidPublish(store.getState());

      if (!currentFormDidPublish) {
        replace('/form/not-published');
        return done();
      }

      store.dispatch(subActions.hydrateSubmissionForm(id));
      return done();
    })
    .catch(() => {
      replace('/form/not-published');
      return done();
    });
};
