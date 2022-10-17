import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import userApi from '../api/user';
import authApi from './../api/auth';
import { setUser, getUser, setPosts, setUsers } from './app';
import postApi from './../api/post';
import { dateSorter } from './../utils/index';

// Actions

// Authentication API calls
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const AUTHENTICATION_LOGIN_REQUEST = 'AUTHENTICATION_LOGIN_REQUEST';

// User API calls
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_ERROR = 'USER_ERROR';
export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST';
export const GET_AND_UPDATE_CURRENT = 'GET_AND_UPDATE_CURRENT';
export const FOLLOW_USER = 'FOLLOW_USER';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';

// Post API calls
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_ERROR = 'POST_ERROR';
export const GET_FEED_REQUEST = 'GET_FEED_REQUEST';
export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';

// Comment API calls
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS';
export const COMMENT_ERROR = 'COMMENT_ERROR';

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
export const getAllUsers = () => ({
    type: GET_ALL_USERS_REQUEST
});
export const getAndUpdateCurrentUser = () => ({
    type: GET_AND_UPDATE_CURRENT
});
export const followUser = (targetId, thisId) => ({
    type: FOLLOW_USER,
    targetId,
    thisId
});

export const unfollowUser = (targetId, thisId) => ({
    type: UNFOLLOW_USER,
    targetId,
    thisId
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
export const requestFeed = () => ({
    type: GET_FEED_REQUEST
});
export const requestCreatePost = (postData) => ({
    type: CREATE_POST_REQUEST,
    postData
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
function* sagaGetAllUsers() {
    try {
        let response = {};
        response = yield call(userApi.getAll);
        yield put(setUsers(response));
        yield put(userSuccess(response));
    } catch (error) {
        yield put(userError(error));
    }
}

function* sagaGetAndUpdateUser() {
    try {
        let response = {};
        const user = yield select(getUser);
        console.log(user);
        response = yield call(userApi.getUser, user.username);
        yield put(setUser(response));
        yield put(userSuccess(response));
    } catch (error) {
        yield put(userError(error));
    }
}

function* sagaFollowUser(action) {
    try {
        let response = {};
        response = yield call(
            userApi.followUser,
            action.targetId,
            action.thisId
        );
        yield put(userSuccess(response));
    } catch (error) {
        yield put(userError(error));
    }
}

function* sagaUnfollowUser(action) {
    try {
        let response = {};
        response = yield call(
            userApi.unfollowUser,
            action.targetId,
            action.thisId
        );
        yield put(userSuccess(response));
    } catch (error) {
        yield put(userError(error));
    }
}
function* sagaRequestLogin(action) {
    try {
        let request = {
            username: action.username,
            password: action.password
        };
        let response = {};
        response = yield call(authApi.login, request);
        window.localStorage.setItem('currentUser', JSON.stringify(response));
        yield put(setUser(response.user));
        yield put(authenticationSuccess(response));
    } catch (error) {
        yield put(authenticationError(error));
    }
}

function* sagaRequestFeed() {
    try {
        const user = yield select(getUser);
        let response = {};
        response = yield call(postApi.getFeed, user.id);
        const sortedResponse = yield call(dateSorter, response);
        yield put(setPosts(sortedResponse));
        yield put(postSuccess(response));
    } catch (error) {
        yield put(postError(error));
    }
}

function* sagaCreatePost(action) {
    try {
        const user = yield select(getUser);
        const request = { userId: user.id, description: action.postData };
        const response = yield call(postApi.createPost, request);
        yield put(postSuccess(response));
    } catch (error) {
        yield put(postError);
    }
}

export function* callsSaga() {
    yield all([
        yield takeEvery(AUTHENTICATION_LOGIN_REQUEST, sagaRequestLogin),
        yield takeEvery(GET_ALL_USERS_REQUEST, sagaGetAllUsers),
        yield takeEvery(GET_AND_UPDATE_CURRENT, sagaGetAndUpdateUser),
        yield takeEvery(FOLLOW_USER, sagaFollowUser),
        yield takeEvery(UNFOLLOW_USER, sagaUnfollowUser),
        yield takeEvery(GET_FEED_REQUEST, sagaRequestFeed),
        yield takeEvery(CREATE_POST_REQUEST, sagaCreatePost)
    ]);
}

// Selectors

export default callsReducer;
