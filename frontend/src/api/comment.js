import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3001/comments';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '/api/comments';
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

const createComment = async (newComment) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.post(baseUrl, newComment, config);
    return res.data;
};

const getComment = async (commentId) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.get(`${baseUrl}/${commentId}`, config);
    return res.data;
};

const updateComment = async (commentId, newComment) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.put(`${baseUrl}/${commentId}`, newComment, config);
    return res.data;
};

const commentApi = { getAll, createComment, getComment, updateComment };
export default commentApi;
