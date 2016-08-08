import { isUserAuthenticated, isCompanyAuthenticated } from '../selectors/auth';
import {
  VERIFY_TOKEN,
  FETCH_REQUEST,
} from '../actionTypes';

export default (store, api) => (nextState, replace, callback) => {
  const state = store.getState();
  const token = localStorage.token;
  const done = () => callback();

  if (!token || isUserAuthenticated(state) || isCompanyAuthenticated(state)) return done();

  const { userOrCompany, id } = localStorage;

  const dispatchTokenAndFetch = (obj) => {
    if (!obj.verified) throw new Error('Not verified');

    if (userOrCompany === 'user') {
      store.dispatch({
        type: VERIFY_TOKEN,
        payload: {
          type: 'user',
          id,
        },
      });

      store.dispatch({
        type: FETCH_REQUEST,
        payload: {
          type: 'user',
          id,
        },
      });
    } else {
      store.dispatch({
        type: VERIFY_TOKEN,
        payload: {
          type: 'company',
          id,
        },
      });

      store.dispatch({
        type: FETCH_REQUEST,
        payload: {
          type: 'company',
          id,
        },
      });
    }
  };

  return api.verify(token)
    .then(dispatchTokenAndFetch)
    .then(() => {
      const nextPath = nextState.location.pathname;

      if (nextPath === '/admin-login' && isUserAuthenticated(store.getState())) {
        replace('/admin');
      }

      if (nextPath === '/company-login' && isCompanyAuthenticated(store.getState())) {
        replace('/company');
      }

      return done();
    })
    .catch(done);
};
