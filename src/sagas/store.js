import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { normalize, arrayOf } from 'normalizr';
import { api } from '../services/api';
import * as schemaDef from '../services/api/definitions';
import * as types from 'constants/actionTypes';

function* fetch(action) {
  const { type, id } = action.payload;
  const record = yield api.fetch(type, id);
  const payload = normalize(record, schemaDef[type]);

  yield put({ type: types.FETCH_SUCCESS, payload });
}

export function* watchFetchRequest() {
  yield* takeEvery(types.FETCH_REQUEST, fetch);
}

function* find(action) {
  const { type, filters } = action.payload;
  const records = yield api.find(type, filters);
  const payload = normalize(records, arrayOf(schemaDef[type]));

  yield put({ type: types.FIND_SUCCESS, payload });
}

export function* watchFindRequest() {
  yield* takeEvery(types.FIND_REQUEST, find);
}

function* create(action) {
  const { type, record } = action.payload;
  const createdRecord = yield api.create(type, record);
  const payload = normalize(createdRecord, schemaDef[type]);

  yield put({ type: types.CREATE_SUCCESS, payload });
}

export function* watchCreateRequest() {
  yield* takeEvery(types.CREATE_REQUEST, create);
}

function* update(action) {
  const { type, id, data } = action.payload;
  const updatedRecord = yield api.update(type, id, data);
  const payload = normalize(updatedRecord, schemaDef[type]);

  yield put({ type: types.UPDATE_SUCCESS, payload });
}

export function* watchUpdateRequest() {
  yield* takeEvery(types.UPDATE_REQUEST, update);
}

function* del(action) {
  const { type, id } = action.payload;
  const deletedRecord = yield api.del(type, id);
  const payload = normalize(deletedRecord, schemaDef[type]);

  yield put({ type: types.DELETE_SUCCESS, payload });
}

export function* watchDeleteRequest() {
  yield* takeEvery(types.DELETE_REQUEST, del);
}
