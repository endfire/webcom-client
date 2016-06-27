import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { api } from '../services/api';
import * as schemas from '../services/api/definitions';
import { FETCH_SUCCESS, FETCH_REQUEST } from '../actionTypes';

export function* fetch(action) {
  const { type, id } = action.payload;
  const record = yield api.fetch(type, id);
  const payload = normalize(record, schemas[type]);

  yield put({ type: FETCH_SUCCESS, payload });
}

export function* watchFetchRequest() {
  yield* takeEvery(FETCH_REQUEST, fetch);
}

export default function* rootSaga() {
  yield [
    watchFetchRequest(),
  ];
}
