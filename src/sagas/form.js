import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { api } from '../services/api';
import * as schemaDef from '../services/api/definitions';
import schemas from '../services/api/schemas';
import { Map } from 'immutable';
import {
  FETCH_SUCCESS,
  UPDATE_SUCCESS,
  INITIALIZE_FORM_SUCCESS,
  INITIALIZE_FORM,
  UPDATE_FORM_SUCCESS,
  UPDATE_FORM,
} from '../actionTypes';

function* initializeForm(action) {
  const { type, id, field } = action.payload;
  const token = localStorage.token;
  const record = yield api.fetch(token, type, id);
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

function* updateForm(action) {
  const { type, id, data } = action.payload;
  const token = localStorage.token;
  const updatedRecord = yield api.update(token, type, id, data);
  const payload = normalize(updatedRecord, schemaDef[type]);

  yield put({ type: UPDATE_SUCCESS, payload });
  yield put({ type: UPDATE_FORM_SUCCESS });
}

export function* watchUpdateFormRequest() {
  yield* takeEvery(UPDATE_FORM, updateForm);
}
