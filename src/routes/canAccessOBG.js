import { getCanUserAccessOBG } from 'selectors/admin';

export default (store) => (nextState, replace, callback) => {
  const state = store.getState();
  const canUserAccessOBG = getCanUserAccessOBG(state);
  const done = () => callback();

  if (!canUserAccessOBG) {
    replace('/admin/brands');
    return done();
  }

  return done();
};
