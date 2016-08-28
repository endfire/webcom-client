import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { api } from 'services/api';
import { syncStore } from 'actions/store';
import * as types from 'constants/actionTypes';

function* fetch(action) {
  const { type, id } = action.payload;
  const record = yield api.fetch(type, id);

  try {
    yield put({ type: types.FETCH_SUCCESS, payload: action.payload });
    yield put(syncStore(type, record));
  } catch (e) {
    yield put({ type: types.FETCH_ERROR, payload: e, error: true });
  }
}

export function* watchFetchRequest() {
  yield* takeEvery(types.FETCH_REQUEST, fetch);
}

function* find(action) {
  const { type, filters } = action.payload;
  const records = yield api.find(type, filters);

  try {
    yield put({ type: types.FIND_SUCCESS, payload: action.payload });
    yield put(syncStore(type, records));
  } catch (e) {
    yield put({ type: types.FIND_ERROR, payload: e, error: true });
  }
}

export function* watchFindRequest() {
  yield* takeEvery(types.FIND_REQUEST, find);
}

function* create(action) {
  const { type, record } = action.payload;
  const createdRecord = yield api.create(type, record);

  try {
    yield put({ type: types.CREATE_SUCCESS, payload: action.payload });
    yield put(syncStore(type, createdRecord));
  } catch (e) {
    yield put({ type: types.CREATE_ERROR, payload: e, error: true });
  }
}

export function* watchCreateRequest() {
  yield* takeEvery(types.CREATE_REQUEST, create);
}

function* update(action) {
  const { type, id, data } = action.payload;
  const updatedRecord = yield api.update(type, id, data);

  try {
    yield put({ type: types.UPDATE_SUCCESS, payload: action.payload });
    yield put(syncStore(type, updatedRecord));
  } catch (e) {
    yield put({ type: types.UPDATE_ERROR, payload: e, error: true });
  }
}

export function* watchUpdateRequest() {
  yield* takeEvery(types.UPDATE_REQUEST, update);
}

function* del(action) {
  const { type, id } = action.payload;
  const deletedRecord = yield api.del(type, id);

  try {
    yield put({ type: types.DELETE_SUCCESS, payload: action.payload });
    yield put(syncStore(type, deletedRecord, true));
  } catch (e) {
    yield put({ type: types.DELETE_ERROR, payload: e, error: true });
  }
}

export function* watchDeleteRequest() {
  yield* takeEvery(types.DELETE_REQUEST, del);
}
