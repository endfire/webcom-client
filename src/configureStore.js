import { createStore } from 'redux';
import testApp from './reducers';
import DevTools from './containers/DevTools';

const enhancer = DevTools.instrument();
const configureStore = () => createStore(testApp, enhancer);

export default configureStore;
