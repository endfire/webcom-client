import {
  watchFetchRequest,
  watchFindRequest,
  watchCreateRequest,
  watchUpdateRequest,
  watchDeleteRequest,
} from './store';

import {
  watchInitializeFormRequest,
  watchUpdateFormRequest,
} from './form';

export default function* rootSaga() {
  yield [
    watchFetchRequest(),
    watchFindRequest(),
    watchCreateRequest(),
    watchUpdateRequest(),
    watchDeleteRequest(),
    watchInitializeFormRequest(),
    watchUpdateFormRequest(),
  ];
}
