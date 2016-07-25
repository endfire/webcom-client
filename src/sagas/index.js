import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { normalize, arrayOf } from 'normalizr';
import { api } from '../services/api';
import * as schemas from '../services/api/definitions';
import {
  FETCH_SUCCESS,
  FETCH_REQUEST,
  FIND_SUCCESS,
  FIND_REQUEST,
  CREATE_SUCCESS,
  CREATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_REQUEST,
  DELETE_SUCCESS,
  DELETE_REQUEST } from '../actionTypes';

export function* fetch(action) {
  const { type, id } = action.payload;
  const record = yield api.fetch(type, id);
  const payload = normalize(record, schemas[type]);

  yield put({ type: FETCH_SUCCESS, payload });
}

export function* watchFetchRequest() {
  yield* takeEvery(FETCH_REQUEST, fetch);
}

export function* find(action) {
  const { type } = action.payload;
  const records = yield api.find(type);
  const payload = normalize(records, arrayOf(schemas[type]));

  yield put({ type: FIND_SUCCESS, payload });
}

export function* watchFindRequest() {
  yield* takeEvery(FIND_REQUEST, find);
}

export function* create(action) {
  const { type, record } = action.payload;
  const createdRecord = yield api.create(type, record);
  const payload = normalize(createdRecord, schemas[type]);

  yield put({ type: CREATE_SUCCESS, payload });
}

export function* watchCreateRequest() {
  yield* takeEvery(CREATE_REQUEST, create);
}

export function* update(action) {
  const { type, id, data } = action.payload;
  const updatedRecord = yield api.update(type, id, data);
  const payload = normalize(updatedRecord, schemas[type]);

  yield put({ type: UPDATE_SUCCESS, payload });
}

export function* watchUpdateRequest() {
  yield* takeEvery(UPDATE_REQUEST, update);
}

export function* del(action) {
  const { type, id } = action.payload;
  const payload = yield api.del(type, id);
  // payload = { deleted: true, id } OR { deleted: false }
  // FIXME: modify state.store to handle deletion

  yield put({ type: DELETE_SUCCESS, payload });
}

export function* watchDeleteRequest() {
  yield* takeEvery(DELETE_REQUEST, del);
}

export default function* rootSaga() {
  yield [
    watchFetchRequest(),
    watchFindRequest(),
    watchCreateRequest(),
    watchUpdateRequest(),
    watchDeleteRequest(),
  ];
}
