import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3001/api/comments';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '/api/comments';
}

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const createComment = async (newComment) => {
    const res = await axios.post(baseUrl, newComment);
    return res.data;
};

const getComment = async (commentId) => {
    const res = await axios.get(`${baseUrl}/${commentId}`);
    return res.data;
};

const updateComment = async (commentId, newComment) => {
    const res = await axios.put(`${baseUrl}/${commentId}`, newComment);
    return res.data;
};

const commentApi = { getAll, createComment, getComment, updateComment };
export default commentApi;
