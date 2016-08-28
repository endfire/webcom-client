import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { api } from '../services/api';
import { user as userSchema, company as companySchema } from '../services/api/definitions';
import { browserHistory } from 'react-router';
import * as types from 'constants/actionTypes';

const forwardTo = (path) => browserHistory.push(path);
const allowedPaths = ['/admin', '/company'];

function* loginRequest(action) {
  const { email, password, path } = action.payload;

  try {
    if (!allowedPaths.includes(path)) throw new Error();

    if (path === '/admin') {
      const { user, token } = yield api.authToken(email, password);
      const payload = normalize(user, userSchema);
      const payloadUser = {
        id: user.id,
        field: 'user',
        role: user.role,
      };

      yield put({ type: types.FETCH_SUCCESS, payload });
      yield put({ type: types.LOGIN_SUCCESS, payload: payloadUser });

      localStorage.token = token;
      localStorage.id = user.id;
      localStorage.userOrCompany = 'user';
    } else {
      const { company, token } = yield api.authToken(email, password);
      const payload = normalize(company, companySchema);

      yield put({ type: types.FETCH_SUCCESS, payload });
      yield put({ type: types.LOGIN_SUCCESS, payload: { id: company.id, field: 'company' } });

      localStorage.token = token;
      localStorage.id = company.id;
      localStorage.userOrCompany = 'company';
    }

    forwardTo(path);
  } catch (e) {
    yield put({ type: types.LOGIN_ERROR, payload: e, error: true });
  }
}

export function* watchLoginRequest() {
  yield* takeEvery(types.LOGIN_REQUEST, loginRequest);
}

function* logoutRequest(action) {
  const path = action.payload;

  yield put({ type: types.LOGOUT_SUCCESS });

  localStorage.token = null;
  localStorage.id = null;
  localStorage.userOrCompany = null;

  forwardTo(path);
}

export function* watchLogoutRequest() {
  yield* takeEvery(types.LOGOUT_REQUEST, logoutRequest);
}
