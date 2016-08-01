import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { normalize, arrayOf } from 'normalizr';
import { api } from '../services/api';
import * as schemaDef from '../services/api/definitions';
import schemas from '../services/api/schemas';
import { Map } from 'immutable';
// import store from '../configureStore';
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
  INITIALIZE_FORM_SUCCESS,
  INITIALIZE_FORM,
  UPDATE_FORM_SUCCESS,
  UPDATE_FORM,
} from '../actionTypes';

// import selector --> getLoggedInCompany
// using the selector in saga --> getLoggedInCompany(store.getState())
//
// need another selector to filter out entities (propably in mapStateToProps)

export function* fetchCompany() {
  const action = {
    payload: {
      type: 'company',
      // id: getLoggedInCompany(store.getState()),
    },
  };

  yield put({ type: FETCH_REQUEST, action });
}

export function* watchFetchCompanyRequest() {
  yield* takeEvery('FETCH_COMPANY_REQUEST', fetchCompany);
}

export function* fetch(action) {
  const { type, id } = action.payload;
  const record = yield api.fetch(type, id);
  const payload = normalize(record, schemaDef[type]);

  yield put({ type: FETCH_SUCCESS, payload });
}

export function* watchFetchRequest() {
  yield* takeEvery(FETCH_REQUEST, fetch);
}

export function* find(action) {
  const { type, filters } = action.payload;
  const records = yield api.find(type, filters);
  const payload = normalize(records, arrayOf(schemaDef[type]));

  yield put({ type: FIND_SUCCESS, payload });
}

export function* watchFindRequest() {
  yield* takeEvery(FIND_REQUEST, find);
}

export function* create(action) {
  const { type, record } = action.payload;
  const createdRecord = yield api.create(type, record);
  const payload = normalize(createdRecord, schemaDef[type]);

  yield put({ type: CREATE_SUCCESS, payload });
}

export function* watchCreateRequest() {
  yield* takeEvery(CREATE_REQUEST, create);
}

export function* update(action) {
  const { type, id, data } = action.payload;
  const updatedRecord = yield api.update(type, id, data);
  const payload = normalize(updatedRecord, schemaDef[type]);

  yield put({ type: UPDATE_SUCCESS, payload });
}

export function* watchUpdateRequest() {
  yield* takeEvery(UPDATE_REQUEST, update);
}

export function* del(action) {
  const { type, id } = action.payload;
  const deletedRecord = yield api.del(type, id);
  const payload = normalize(deletedRecord, schemaDef[type]);

  yield put({ type: DELETE_SUCCESS, payload });
}

export function* watchDeleteRequest() {
  yield* takeEvery(DELETE_REQUEST, del);
}

export function* initializeForm(action) {
  const { type, id, field } = action.payload;
  const record = yield api.fetch(type, id);
  const payload = normalize(record, schemaDef[type]);

  yield put({ type: FETCH_SUCCESS, payload });

  delete payload.entities[field][id].meta;

  const attributesArray = Object.keys(schemas[type].attributes);
  const formMap = Map(payload.entities[field][id])
    .filter((val, key) => attributesArray.includes(key));

  yield put({ type: INITIALIZE_FORM_SUCCESS, payload: formMap });
}

export function* watchInitializeFormRequest() {
  yield* takeEvery(INITIALIZE_FORM, initializeForm);
}

export function* updateForm(action) {
  const { type, id, data } = action.payload;
  const updatedRecord = yield api.update(type, id, data);
  const payload = normalize(updatedRecord, schemaDef[type]);

  yield put({ type: UPDATE_SUCCESS, payload });
  yield put({ type: UPDATE_FORM_SUCCESS });
}

export function* watchUpdateFormRequest() {
  yield* takeEvery(UPDATE_FORM, updateForm);
}

export default function* rootSaga() {
  yield [
    watchFetchRequest(),
    watchFindRequest(),
    watchCreateRequest(),
    watchUpdateRequest(),
    watchDeleteRequest(),
    watchInitializeFormRequest(),
    watchUpdateFormRequest(),
    watchFetchCompanyRequest(),
  ];
}
