import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import app, { appSaga } from './../redux/app';
import calls, { callsSaga } from '../redux/calls';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

const configureStore = (preloadedState) => {
    const middlewares = [];

    const sagaMiddleware = createSagaMiddleware({
        onError: (error = {}, errorInfo = {}) => {
            const { message, stack } = error;
            const { sagaStack } = errorInfo;
            const errorMessage = `message:(${message}), stack:(${stack}), sagaStack:(${sagaStack})`;
            console.log(errorMessage);
        }
    });
    middlewares.push(sagaMiddleware);

    const loggerMiddleware = createLogger({ duration: true });
    if (process.env.NODE_ENV === 'development') {
        middlewares.push(loggerMiddleware);
    }

    const composeEnhancers = compose;

    const rootReducer = combineReducers({ app, calls });

    const store = createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(applyMiddleware(...middlewares))
    );
    function* rootSaga() {
        yield all([appSaga(), callsSaga()]);
    }
    sagaMiddleware.run(rootSaga);

    return store;
};

export default configureStore;
