import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3001/api/posts';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '/api/posts';
}
const tokenBearer = 'Bearer ';
let user = JSON.parse(window.localStorage.getItem('currentUser')) || null;
let token;
if (user !== null && user.token !== null) {
    token = user.token;
}
const getAll = async () => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.get(baseUrl, config);
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

const postApi = { getAll, createPost, getPost, updatePost, getComments };
export default postApi;
