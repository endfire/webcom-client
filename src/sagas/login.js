import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { api } from '../services/api';
import { user as userSchema, company as companySchema } from '../services/api/definitions';
import { browserHistory } from 'react-router';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FETCH_SUCCESS,
} from '../actionTypes';

const forwardTo = (path) => browserHistory.push(path);
const allowedPaths = ['/admin', '/company'];

function* loginRequest(action) {
  const { email, password, path } = action.payload;

  try {
    if (!allowedPaths.includes(path)) throw new Error();

    if (path === '/admin') {
      const { user, token } = yield api.authToken(email, password);
      const payload = normalize(user, userSchema);

      yield put({ type: FETCH_SUCCESS, payload });
      yield put({ type: LOGIN_SUCCESS, payload: { id: user.id, field: 'user' } });

      localStorage.token = token;
      localStorage.id = user.id;
      localStorage.userOrCompany = 'user';
    } else {
      const { company, token } = yield api.authToken(email, password);
      const payload = normalize(company, companySchema);

      yield put({ type: FETCH_SUCCESS, payload });
      yield put({ type: LOGIN_SUCCESS, payload: { id: company.id, field: 'company' } });

      localStorage.token = token;
      localStorage.id = company.id;
      localStorage.userOrCompany = 'company';
    }

    forwardTo(path);
  } catch (e) {
    yield put({ type: LOGIN_ERROR, payload: e, error: true });
  }
}

export default function*() {
  yield* takeEvery(LOGIN_REQUEST, loginRequest);
}
