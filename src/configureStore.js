import { createStore } from 'redux';
import testApp from './reducers';
import DevTools from './containers/DevTools';

const initialState = { session: { isLoggedIn: false, userId: '', token: '' } };
const enhancer = DevTools.instrument();
const configureStore = () => createStore(testApp, initialState, enhancer);

export default configureStore;
