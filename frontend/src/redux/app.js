import { all, call, takeEvery } from 'redux-saga/effects';
import userApi from './../api/user';

// Actions

const SET_USER = 'freakyFinder/SET_USER';
const SET_POSTS = 'freakyFinder/SET_POSTS';
const GET_USERS = 'freakyFinder/GET_USERS';

// Action creators
export const setUser = (user) => ({
    type: SET_USER,
    user
});
export const setPosts = (posts) => ({
    type: SET_POSTS,
    posts
});
export const fetchUsers = () => ({
    type: GET_USERS
});

const initialState = {
    testMessage: 'testmessage',
    user: null,
    posts: []
};

// Reducer
export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user };
        case SET_POSTS:
            return { ...state, posts: action.posts };
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

export function* appSaga() {
    yield all([yield takeEvery(GET_USERS, sagaFetchUsers)]);
}

// Selectors
export const getPosts = (state) => {
    return state.app.posts;
};
export const getUser = (state) => {
    return state.app.user;
};

export default appReducer;
