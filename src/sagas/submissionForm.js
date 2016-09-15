import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import store from 'configureStore';
import * as types from 'constants/actionTypes';
import * as actions from 'actions/store';

function* initializeSubmissionFormRequest(action) {
  const { formID } = action.payload;

  try {
    yield put({ type: types.HYDRATE_SUBMISSION_FORM, payload: formID });
    yield put({ type: types.INITIALIZE_SUBMISSION_FORM_SUCCESS, payload: formID });
  } catch (e) {
    yield put({ type: types.INITIALIZE_SUBMISSION_FORM_ERROR, payload: e, error: true });
  }
}

export function* watchInitializeSubmissionFormRequest() {
  yield* takeEvery(types.INITIALIZE_SUBMISSION_FORM_REQUEST, initializeSubmissionFormRequest);
}

function* initializeSubmissionFormItemsRequest(action) {
  const { formID } = action.payload;

  try {
    yield put(actions.fetchRelated('form', formID, 'payment', 'payment'));
    yield put({ type: types.HYDRATE_SUBMISSION_FORM_ITEMS, payload: formID });
    yield put({ type: types.INITIALIZE_SUBMISSION_FORM_ITEMS_SUCCESS, payload: formID });
  } catch (e) {
    yield put({ type: types.INITIALIZE_SUBMISSION_FORM_ITEMS_ERROR, payload: e, error: true });
  }
}

export function* watchInitializeSubmissionFormItemsRequest() {
  yield* takeEvery(
    types.INITIALIZE_SUBMISSION_FORM_ITEMS_REQUEST,
    initializeSubmissionFormItemsRequest
  );
}

function* submitSubmissionForm(action) {
  const { formID } = action.payload;
  const state = store.getState();
  const record = state.submissionForm.get(formID).toJS();

  yield put(actions.createRecord('submission', record));
}

export function* watchSubmitSubmissionForm() {
  yield* takeEvery(types.SUBMIT_SUBMISSION_FORM, submitSubmissionForm);
}
