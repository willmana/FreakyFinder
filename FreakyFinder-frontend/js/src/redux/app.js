import { select, all, takeEvery } from 'redux-saga/effects';

const SET_TEST_MESSAGE = 'freakyFinder/SET_TEST_MESSAGE';
const CONSOLE_LOG_TEST_MESSAGE = 'freakyFinder/CONSOLE_LOG_TEST_MESSAGE';
const SET_USER_LOGGED_IN = 'freakyFinder/SET_USER_LOGGED_IN';

export const setTestMessage = (testMessage) => ({
    type: SET_TEST_MESSAGE,
    testMessage
});
export const setUserLoggedIn = (userLoggedIn) => ({
    type: SET_USER_LOGGED_IN,
    userLoggedIn
});
export const consoleLogTestMessage = () => ({
    type: CONSOLE_LOG_TEST_MESSAGE
});

const initialState = {
    testMessage: 'testmessage',
    userLoggedIn: false
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEST_MESSAGE:
            return { ...state, testMessage: action.testMessage };
        case SET_USER_LOGGED_IN:
            return { ...state, userLoggedIn: action.userLoggedIn };
        default:
            return state;
    }
};

function* sagaSetUserLoggedIn() {
    yield put(setUserLoggedIn, true);
}

export const getTestMessage = (state) => {
    return state.app.testMessage;
};
export const getUserLoggedIn = (state) => {
    return state.app.userLoggedIn;
};

export function* appSaga() {
    yield all([takeEvery(SET_USER_LOGGED_IN, sagaSetUserLoggedIn)]);
}

export default appReducer;
