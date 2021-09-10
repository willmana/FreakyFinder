import { select, all, takeEvery } from 'redux-saga/effects';

const SET_TEST_MESSAGE = 'freakyFinder/SET_TEST_MESSAGE';
const CONSOLE_LOG_TEST_MESSAGE = 'freakyFinder/CONSOLE_LOG_TEST_MESSAGE';

export const setTestMessage = (testMessage) => ({
    type: SET_TEST_MESSAGE,
    testMessage,
});
export const consoleLogTestMessage = () => ({
    type: CONSOLE_LOG_TEST_MESSAGE,
});

const initialState = {
    testMessage: 'testmessage',
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEST_MESSAGE:
            return { ...state, testMessage: action.testMessage };
        default:
            return state;
    }
};

function* sagaConsoleLogTestMessage() {
    const message = yield select(getTestMessage);
    console.log(message);
}

export const getTestMessage = (state) => {
    return state.app.testMessage;
};

export function* appSaga() {
    yield all([takeEvery(CONSOLE_LOG_TEST_MESSAGE, sagaConsoleLogTestMessage)]);
}

export default appReducer;
