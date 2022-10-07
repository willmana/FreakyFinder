import { all, takeEvery, put, race, take } from 'redux-saga/effects';
import {
    requestLogin,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_ERROR,
    requestFeed,
    POST_SUCCESS,
    POST_ERROR,
    requestCreatePost
} from './calls';

// Actions

const SET_USER = 'SET_USER';
const SET_USERS = 'SET_USERS';
const SET_POSTS = 'SET_POSTS';
const RIGHT_BAR_DATA = 'RIGHT_BAR_DATA';
const SET_LOADING = 'SET_LOADING';
const LOGIN_TO_APPLICATION = 'LOGIN_TO_APPLICATION';
const POST_AND_UPDATE = 'POST_AND_UPDATE';

// Action creators
export const setUser = (user) => ({
    type: SET_USER,
    user
});
export const setUsers = (users) => ({
    type: SET_USERS,
    users
});
export const setRightBarData = (rightBarData) => ({
    type: RIGHT_BAR_DATA,
    rightBarData
});
export const setPosts = (posts) => ({
    type: SET_POSTS,
    posts
});
export const setLoading = (loading) => ({
    type: SET_LOADING,
    loading
});
export const postAndUpdate = (postData) => ({
    type: POST_AND_UPDATE,
    postData
});
export const loginAndGetFeed = (username, password) => ({
    type: LOGIN_TO_APPLICATION,
    username,
    password
});

const initialState = {
    user: null,
    loading: false,
    posts: [],
    users: [],
    rightBarData: []
};

// Reducer
export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user };
        case SET_USERS:
            return { ...state, users: action.users };
        case RIGHT_BAR_DATA:
            return { ...state, rightBarData: action.rightBarData };
        case SET_POSTS:
            return { ...state, posts: action.posts };
        case SET_LOADING:
            return { ...state, loading: action.loading };
        default:
            return state;
    }
};

// Sagas
function* sagaLoginAndFetch(action) {
    try {
        yield put(setLoading(true));
        yield put(requestLogin(action.username, action.password));
        const [loginError] = yield race([
            take(AUTHENTICATION_ERROR),
            take(AUTHENTICATION_SUCCESS)
        ]);
        if (loginError) return;
        yield put(requestFeed());
        const [feedError] = yield race([take(POST_ERROR), take(POST_SUCCESS)]);
        if (feedError) return;
        yield put(setLoading(false));
    } catch (error) {
        yield put(setLoading(false));
    }
}

function* sagaPostAndUpdate(action) {
    try {
        yield put(requestCreatePost(action.postData));
        const [postError] = yield race([take(POST_ERROR), take(POST_SUCCESS)]);
        if (postError) return;
        yield put(requestFeed());
        const [feedError] = yield race([take(POST_ERROR), take(POST_SUCCESS)]);
        if (feedError) return;
    } catch (error) {}
}

export function* appSaga() {
    yield all([
        yield takeEvery(LOGIN_TO_APPLICATION, sagaLoginAndFetch),
        yield takeEvery(POST_AND_UPDATE, sagaPostAndUpdate)
    ]);
}

// Selectors
export const getPosts = (state) => {
    return state.app.posts;
};
export const getUser = (state) => {
    return state.app.user;
};
export const getUsers = (state) => {
    return state.app.users;
};
export const isLoading = (state) => {
    return state.app.loading;
};

export const getRightBarData = (state) => {
    return state.app.rightBarData;
};

export default appReducer;
