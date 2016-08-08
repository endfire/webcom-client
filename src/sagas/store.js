import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { normalize, arrayOf } from 'normalizr';
import { api } from '../services/api';
import * as schemaDef from '../services/api/definitions';
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
  DELETE_REQUEST,
} from '../actionTypes';

function* fetch(action) {
  const { type, id } = action.payload;
  const token = localStorage.token;
  const record = yield api.fetch(token, type, id);
  const payload = normalize(record, schemaDef[type]);

  yield put({ type: FETCH_SUCCESS, payload });
}

export function* watchFetchRequest() {
  yield* takeEvery(FETCH_REQUEST, fetch);
}

function* find(action) {
  const { type, filters } = action.payload;
  const token = localStorage.token;
  const records = yield api.find(token, type, filters);
  const payload = normalize(records, arrayOf(schemaDef[type]));

  yield put({ type: FIND_SUCCESS, payload });
}

export function* watchFindRequest() {
  yield* takeEvery(FIND_REQUEST, find);
}

function* create(action) {
  const { type, record } = action.payload;
  const token = localStorage.token;
  const createdRecord = yield api.create(token, type, record);
  const payload = normalize(createdRecord, schemaDef[type]);

  yield put({ type: CREATE_SUCCESS, payload });
}

export function* watchCreateRequest() {
  yield* takeEvery(CREATE_REQUEST, create);
}

function* update(action) {
  const { type, id, data } = action.payload;
  const token = localStorage.token;
  const updatedRecord = yield api.update(token, type, id, data);
  const payload = normalize(updatedRecord, schemaDef[type]);

  yield put({ type: UPDATE_SUCCESS, payload });
}

export function* watchUpdateRequest() {
  yield* takeEvery(UPDATE_REQUEST, update);
}

function* del(action) {
  const { type, id } = action.payload;
  const token = localStorage.token;
  const deletedRecord = yield api.archive(token, type, id);
  const payload = normalize(deletedRecord, schemaDef[type]);

  yield put({ type: DELETE_SUCCESS, payload });
}

export function* watchDeleteRequest() {
  yield* takeEvery(DELETE_REQUEST, del);
}
