import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as types from 'constants/actionTypes';
import mapFormToActionType from './mapFormToActionType';

function* submitForm(action) {
  const { form } = action.payload;
  const actionType = mapFormToActionType(form);

  yield put({ type: actionType, payload: { form } });
}

export function* watchSubmitFormRequest() {
  yield* takeEvery(types.SUBMIT_FORM_REQUEST, submitForm);
}

export {
  default as watchBrandSettingsFormSubmit,
} from './submissions/submitBrandSettingsForm';

export {
  default as watchCompanySettingsFormSubmit,
} from './submissions/submitCompanySettingsForm';

export {
  default as watchFieldInitializerFormSubmit,
} from './submissions/submitFieldInitializerForm';
