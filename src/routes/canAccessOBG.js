import { getCanUserAccessOBG } from 'selectors/admin';

export default (store) => (nextState, replace, cb) => {
  const state = store.getState();
  const canUserAccessOBG = getCanUserAccessOBG(state);
  const done = () => cb();

  if (!canUserAccessOBG) {
    replace('/admin/brands');
    return done();
  }

  return done();
};
