import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3001/users';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = window.location.hostname + '/api/users';
}

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const createUser = async (newUser) => {
    const res = await axios.post(baseUrl, newUser);
    return res.data;
};

const getUser = async (userId) => {
    const res = await axios.get(`${baseUrl}/${userId}`);
    return res.data;
};

const updateUser = async (userId, newUser) => {
    const res = await axios.put(`${baseUrl}/${userId}`, newUser);
    return res.data;
};

const userApi = { getAll, createUser, getUser, updateUser };
export default userApi;
