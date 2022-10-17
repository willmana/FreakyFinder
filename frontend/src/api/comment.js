import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3001/api/comments';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '/api/comments';
}

const tokenBearer = 'Bearer ';
let token = JSON.parse(window.localStorage.getItem('token')) || null;

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
