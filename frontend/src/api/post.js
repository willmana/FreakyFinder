import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3001/api/posts';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '/api/posts';
}
const tokenBearer = 'Bearer ';
let token = JSON.parse(window.localStorage.getItem('token')) || null;

const getAll = async () => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.get(baseUrl, config);
    return res.data;
};

const getFeed = async (userId, givenToken) => {
    // Token given separately here since it didn't seem to update on time
    const config = {
        headers: { Authorization: tokenBearer + JSON.parse(givenToken) }
    };
    const res = await axios.get(`${baseUrl}/feed/${userId}`, config);
    return res.data;
};

const createPost = async (newPost) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.post(baseUrl, newPost, config);
    return res.data;
};

const getPost = async (postId) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.get(`${baseUrl}/${postId}`, config);
    return res.data;
};

const updatePost = async (postId, newPost) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.put(`${baseUrl}/${postId}`, newPost, config);
    return res.data;
};

const getComments = async (commentId) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.get(`${baseUrl}/comments/${commentId}`, config);
    return res.data;
};

const getUserPosts = async (userId) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.get(`${baseUrl}/user/${userId}`, config);
    return res.data;
};

const postApi = {
    getAll,
    createPost,
    getPost,
    updatePost,
    getComments,
    getFeed,
    getUserPosts
};
export default postApi;
