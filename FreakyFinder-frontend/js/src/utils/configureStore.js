import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import app, { appSaga } from './../redux/app';
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
        },
    });
    middlewares.push(sagaMiddleware);

    const loggerMiddleware = createLogger({ duration: true });
    middlewares.push(loggerMiddleware);

    const composeEnhancers = compose;

    const rootReducer = combineReducers({ app });

    const store = createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(applyMiddleware(...middlewares))
    );
    function* rootSaga() {
        yield all([appSaga()]);
    }
    sagaMiddleware.run(rootSaga);

    return store;
};

export default configureStore;
