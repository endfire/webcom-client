import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { api } from 'services/api';
import store from 'configureStore';
import { browserHistory } from 'react-router';
import * as types from 'constants/actionTypes';
import * as actions from 'actions/store';

const forwardTo = (path) => browserHistory.push(path);

function* initializeSubmissionFormItems(action) {
  const { formID } = action.payload;

  const records = yield api.fetchRelated('form', formID, 'payment');
  yield put(actions.syncStore('payment', records));

  yield put({ type: types.HYDRATE_SUBMISSION_FORM_ITEMS, payload: { formID } });
}

export function* watchInitializeSubmissionFormItems() {
  yield* takeEvery(types.INITIALIZE_SUBMISSION_FORM_ITEMS, initializeSubmissionFormItems);
}

function* submitSubmissionForm(action) {
  const { formID } = action.payload;
  const state = store.getState();
  const record = state.submissionForm.get(formID).toJS();

  yield put(actions.createRecord('submission', record));

  forwardTo('/submit-success');
}

export function* watchSubmitSubmissionForm() {
  yield* takeEvery(types.SUBMIT_SUBMISSION_FORM, submitSubmissionForm);
}
