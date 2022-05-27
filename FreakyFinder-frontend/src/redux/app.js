const SET_USER = 'freakyFinder/SET_USER';
const SET_POSTS = 'freakyFinder/SET_POSTS';

export const setUser = (user) => ({
    type: SET_USER,
    user
});
export const setPosts = (posts) => ({
    type: SET_POSTS,
    posts
});
const initialState = {
    testMessage: 'testmessage',
    user: null,
    posts: []
};

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

export const getPosts = (state) => {
    return state.app.posts;
};
export const getUser = (state) => {
    return state.app.user;
};

export function* appSaga() {}

export default appReducer;
