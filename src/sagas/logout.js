import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from '../actionTypes';

const forwardTo = (path) => browserHistory.push(path);

function* logoutRequest(action) {
  const path = action.payload;

  yield put({ type: LOGOUT_SUCCESS });

  localStorage.token = null;
  localStorage.id = null;
  localStorage.userOrCompany = null;

  forwardTo(path);
}

export default function*() {
  yield* takeEvery(LOGOUT_REQUEST, logoutRequest);
}
