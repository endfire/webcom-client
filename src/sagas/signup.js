import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { api } from 'services/api';
import { syncStore } from 'actions/store';
import { browserHistory } from 'react-router';
import * as types from 'constants/actionTypes';

function* authSignupRequest(action) {
  const { payload, payload: { name, email, password, confirm } } = action;

  const invalidFieldError = (field) =>
    new Error(`Missing required field (${field}).`);

  const passwordDoesNotMatchError = () =>
    new Error('Your passwords do not match.');

  try {
    if (!name) throw invalidFieldError('name');
    if (!email) throw invalidFieldError('email');
    if (!password) throw invalidFieldError('password');
    if (!confirm) throw invalidFieldError('confirm');
    if (confirm !== password) throw passwordDoesNotMatchError();

    const { user, token } = yield api.authenticate('signup', 'company', {
      ...payload,
      listings: [],
      ads: [],
      people: [],
    });

    yield put({ type: types.LOGIN_REQUEST, payload: { email, password } });
    yield put(syncStore('company', user));
    yield put({ type: types.LOGIN_SUCCESS, payload: { id: user.id, field: 'company' } });

    localStorage.token = token;
    localStorage.id = user.id;
    localStorage.userOrCompany = 'company';

    browserHistory.push('/company/settings');
  } catch (e) {
    yield put({ type: types.SIGNUP_ERROR, payload: e, error: true });
  }
}

export default function* watchAuthSignupRequest() {
  yield* takeEvery(types.SIGNUP_REQUEST, authSignupRequest);
}
