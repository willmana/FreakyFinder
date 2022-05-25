import { put, all, takeEvery } from 'redux-saga/effects';
import userApi from './../api/user';
import loginApi from './../api/login';

const SET_TEST_MESSAGE = 'freakyFinder/SET_TEST_MESSAGE';
const CONSOLE_LOG_TEST_MESSAGE = 'freakyFinder/CONSOLE_LOG_TEST_MESSAGE';
const SET_USER = 'freakyFinder/SET_USER';
const REQUEST_USER_LOGIN = 'freakyFinder/REQUEST_USER_LOGIN';
const USER_LOGIN_SUCCESS = 'freakyFinder/USER_LOGIN_SUCCESS';
const USER_LOGIN_ERROR = 'freakyFinder/USER_LOGIN_ERROR';

export const setTestMessage = (testMessage) => ({
    type: SET_TEST_MESSAGE,
    testMessage
});
export const setUser = (user) => ({
    type: SET_USER,
    user
});
export const consoleLogTestMessage = () => ({
    type: CONSOLE_LOG_TEST_MESSAGE
});

const initialState = {
    testMessage: 'testmessage',
    user: null
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEST_MESSAGE:
            return { ...state, testMessage: action.testMessage };
        case SET_USER:
            return { ...state, user: action.user };
        default:
            return state;
    }
};

export const getTestMessage = (state) => {
    return state.app.testMessage;
};
export const getUser = (state) => {
    return state.app.user;
};

export function* appSaga() {}

export default appReducer;
