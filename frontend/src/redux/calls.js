import { all, call, takeEvery } from 'redux-saga/effects';
import userApi from '../api/user';
import authApi from './../api/auth';

// Actions

// Authentication API calls
const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
const AUTHENTICATION_LOGIN_REQUEST = 'AUTHENTICATION_LOGIN_REQUEST';

// User API calls
const USER_SUCCESS = 'USER_SUCCESS';
const USER_ERROR = 'USER_ERROR';

// Post API calls
const POST_SUCCESS = 'POST_SUCCESS';
const POST_ERROR = 'POST_ERROR';

// Comment API calls
const COMMENT_SUCCESS = 'COMMENT_SUCCESS';
const COMMENT_ERROR = 'COMMENT_ERROR';

// Action creators

// Authentication API calls
export const authenticationSuccess = (response) => ({
    type: AUTHENTICATION_SUCCESS,
    response
});
export const authenticationError = (error) => ({
    type: AUTHENTICATION_ERROR,
    error
});
export const requestLogin = (username, password) => ({
    type: AUTHENTICATION_LOGIN_REQUEST,
    username,
    password
});

// User API calls
export const userSuccess = (response) => ({
    type: USER_SUCCESS,
    response
});
export const userError = (error) => ({
    type: USER_ERROR,
    error
});

// Post API calls
export const postSuccess = (response) => ({
    type: POST_SUCCESS,
    response
});
export const postError = (error) => ({
    type: POST_ERROR,
    error
});

// Comment API calls
export const commentSuccess = (response) => ({
    type: COMMENT_SUCCESS,
    response
});
export const commentError = (error) => ({
    type: COMMENT_ERROR,
    error
});

const initialState = {};

// Reducer
export const callsReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION_SUCCESS:
        case USER_SUCCESS:
        case POST_SUCCESS:
        case COMMENT_SUCCESS:
            return { ...state, ...action.response };
        default:
            return state;
    }
};

// Sagas
function* sagaFetchUsers(action) {
    try {
        const user = yield call(userApi.getAll);
        yield call(console.log(user));
    } catch (e) {}
}

function* sagaRequestLogin(action) {
    try {
        let request = {
            username: action.username,
            password: action.password
        };
        let response = {};
        response = yield call(authApi.login, request);
    } catch (error) {}
}

export function* callsSaga() {
    yield all([
        yield takeEvery(AUTHENTICATION_LOGIN_REQUEST, sagaRequestLogin)
    ]);
}

// Selectors

export default callsReducer;
