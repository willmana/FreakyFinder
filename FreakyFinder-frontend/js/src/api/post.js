import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3001/posts';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '/api/posts';
}

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const createPost = async (newPost) => {
    console.log(newPost);
    const res = await axios.post(baseUrl, newPost);
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
