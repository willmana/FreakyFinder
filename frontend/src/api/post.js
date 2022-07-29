import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3001/api/posts';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '/api/posts';
}
const tokenBearer = 'Bearer ';

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const createPost = async (newPost, token) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.post(baseUrl, newPost, config);
    return res.data;
};

const getPost = async (postId) => {
    const res = await axios.get(`${baseUrl}/${postId}`);
    return res.data;
};

const updatePost = async (postId, newPost) => {
    const res = await axios.put(`${baseUrl}/${postId}`, newPost);
    return res.data;
};

const postApi = { getAll, createPost, getPost, updatePost };
export default postApi;
