import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import store from 'configureStore';
import { api } from 'services/api';
import { syncStore } from 'actions/store';
import { getFields, getRecordID } from 'selectors/form';
import { submitFormError, submitFormSuccess } from 'actions/form';
import * as types from 'constants/actionTypes';

function* submitBrandSettingsForm(action) {
  const state = store.getState();
  const { form } = action.payload;
  const fields = getFields(form)(state);
  const brandID = getRecordID(form)(state);

  try {
    if (!fields.getIn(['name', 'isValid'])) throw new Error('Please input a brand name');
    if (!fields.getIn(['image', 'isValid'])) throw new Error('Please input an image URL');
    if (!fields.getIn(['url', 'isValid'])) throw new Error('Please input a URL');

    const updatedRecord = yield api.update('brand', brandID, {
      name: fields.getIn(['name', 'value']),
      image: fields.getIn(['image', 'value']),
      url: fields.getIn(['url', 'value']),
      background: fields.getIn(['background', 'value']),
      text: fields.getIn(['text', 'value']),
      secondary: fields.getIn(['secondary', 'value']),
    });

    yield put(syncStore('brand', updatedRecord));
    yield put(submitFormSuccess(form));
  } catch (e) {
    yield put(submitFormError(form, e));
  }
}

export default function* watchBrandSettingsFormSubmit() {
  yield* takeEvery(types.SUBMIT_BRAND_SETTINGS_FORM, submitBrandSettingsForm);
}
