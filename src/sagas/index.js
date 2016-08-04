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

import watchLoginRequest from './login';
import watchLogoutRequest from './logout';

export default function*() {
  yield [
    watchFetchRequest(),
    watchFindRequest(),
    watchCreateRequest(),
    watchUpdateRequest(),
    watchDeleteRequest(),
    watchInitializeFormRequest(),
    watchUpdateFormRequest(),
    watchLoginRequest(),
    watchLogoutRequest(),
  ];
}
