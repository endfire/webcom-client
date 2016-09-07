import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import store from 'configureStore';
import { api } from 'services/api';
import { syncStore } from 'actions/store';
import { getFields, getRecordID } from 'selectors/form';
import { submitFormError, submitFormSuccess } from 'actions/form';
import * as types from 'constants/actionTypes';

function* submitCompanySettingsForm(action) {
  const state = store.getState();
  const { form } = action.payload;
  const fields = getFields(form)(state);
  const companyID = getRecordID(form)(state);

  try {
    if (!fields.getIn(['name', 'isValid'])) throw new Error('Please input a company name');
    if (!fields.getIn(['street', 'isValid'])) throw new Error('Please input a street address');
    if (!fields.getIn(['city', 'isValid'])) throw new Error('Please input a city');
    if (!fields.getIn(['state', 'isValid'])) throw new Error('Please input a state');
    if (!fields.getIn(['zip', 'isValid'])) throw new Error('Please input a zip code');
    if (!fields.getIn(['phone', 'isValid'])) throw new Error('Please input a phone number');
    if (!fields.getIn(['url', 'isValid'])) throw new Error('Please input a valid URL');
    if (!fields.getIn(['email', 'isValid'])) throw new Error('Please input a valid email');
    if (!fields.getIn(['description', 'isValid'])) throw new Error('Please input a description');

    const updatedRecord = yield api.update('company', companyID, {
      name: fields.getIn(['name', 'value']),
      street: fields.getIn(['street', 'value']),
      city: fields.getIn(['city', 'value']),
      state: fields.getIn(['state', 'value']),
      zip: fields.getIn(['zip', 'value']),
      phone: fields.getIn(['phone', 'value']),
      url: fields.getIn(['url', 'value']),
      email: fields.getIn(['email', 'value']),
      description: fields.getIn(['description', 'value']),
      approved: false,
    });

    yield put(syncStore('company', updatedRecord));
    yield put(submitFormSuccess(form));
  } catch (e) {
    yield put(submitFormError(form, e));
  }
}

export default function* watchCompanySettingsFormSubmit() {
  yield* takeEvery(types.SUBMIT_COMPANY_SETTINGS_FORM, submitCompanySettingsForm);
}
