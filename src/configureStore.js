import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { Iterable } from 'immutable';

const logger = createLogger({
  stateTransformer(state) {
    let pieceOfState;
    const newState = {};

    for (const i of Object.keys(state)) {
      pieceOfState = state[i];

      newState[i] = Iterable.isIterable(pieceOfState)
        ? pieceOfState.toJS()
        : pieceOfState;
    }

    return newState;
  },
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(logger, sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;
