import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3001/api/users';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '/api/users';
}

const tokenBearer = 'Bearer ';
let token =
    JSON.parse(window.localStorage.getItem('currentUser')).token || null;

const getAll = async () => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.get(baseUrl, config);
    return res.data;
};

const createUser = async (newUser) => {
    const res = await axios.post(baseUrl, newUser);
    return res.data;
};

const getUser = async (username) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.get(`${baseUrl}/${username}`, config);
    return res.data;
};

const updateUser = async (userId, newUser) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.put(`${baseUrl}/${userId}`, newUser, config);
    return res.data;
};

const userApi = { getAll, createUser, getUser, updateUser };
export default userApi;
