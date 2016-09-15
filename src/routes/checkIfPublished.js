import * as actions from 'actions/store';
import * as subActions from 'actions/submissionForm';
import { getCurrentFormPublished } from 'selectors/dynamicForm';

export default (store, api) => (nextState, replace, callback) => {
  const id = nextState.params.submissionFormID;
  const done = () => callback();

  return api.fetch('form', id)
    .then((record) => store.dispatch(actions.syncStore('form', record)))
    .then(() => {
      const currentFormPublished = getCurrentFormPublished(store.getState());

      if (!currentFormPublished) {
        replace('/form/not-published');
        return done();
      }

      store.dispatch(subActions.initializeSubmissionForm(id));
      return done();
    })
    .catch(() => {
      replace('/form/not-published');
      return done();
    });
};
