import { takeEvery } from 'redux-saga';
import { api } from 'services/api';
import * as types from 'constants/actionTypes';

function* download(action) {
  const { type } = action.payload;

  yield api.downloadRecords(type);
}

export function* watchDownloadRequest() {
  yield* takeEvery(types.DOWNLOAD, download);
}
