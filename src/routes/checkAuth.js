import { normalize } from 'normalizr';
import { user as userSchema, company as companySchema } from '../services/api/definitions';
import { isUserAuthenticated, isCompanyAuthenticated } from '../selectors/auth';
import * as types from 'constants/actionTypes';

export default (store, api) => (nextState, replace, callback) => {
  const state = store.getState();
  const token = localStorage.token;
  const done = () => callback();

  if (!token || isUserAuthenticated(state) || isCompanyAuthenticated(state)) return done();

  const userOrCompany = localStorage.userOrCompany;

  const dispatchTokenAndFetch = (entity) => {
    if (userOrCompany === 'user') {
      store.dispatch({
        type: types.VERIFY_TOKEN,
        payload: { id: entity.id, field: 'user' },
      });

      store.dispatch({
        type: types.FETCH_SUCCESS,
        payload: normalize(entity, userSchema),
      });
    } else {
      store.dispatch({
        type: types.VERIFY_TOKEN,
        payload: { id: entity.id, field: 'company' },
      });

      store.dispatch({
        type: types.FETCH_SUCCESS,
        payload: normalize(entity, companySchema),
      });
    }
  };

  return api.authVerify(token)
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
