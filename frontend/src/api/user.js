import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3001/api/users';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '/api/users';
}

const tokenBearer = 'Bearer ';
let token = JSON.parse(window.localStorage.getItem('token')) || null;

const getAll = async () => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.get(baseUrl, config);
    return res.data;
};

const createUser = async (newUser) => {
    const res = await axios.post(baseUrl, newUser);
    return res.data;
};

const getUserByUsername = async (username) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.get(`${baseUrl}/profile/${username}`, config);
    return res.data;
};

const getUserByUserId = async (userId) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.get(`${baseUrl}/${userId}`, config);
    return res.data;
};

const updateUser = async (userId, requestBody) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.put(
        `${baseUrl}/${userId}/modify`,
        requestBody,
        config
    );
    return res.data;
};

const updatePassword = async (userId, requestBody) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.put(
        `${baseUrl}/${userId}/password`,
        requestBody,
        config
    );
    return res.data;
};

const followUser = async (followedId, userId) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.put(
        `${baseUrl}/${followedId}/follow`,
        { userId: userId },
        config
    );
    return res.data;
};

const unfollowUser = async (targetId, userId) => {
    const config = { headers: { Authorization: tokenBearer + token } };
    const res = await axios.put(
        `${baseUrl}/${targetId}/unfollow`,
        { userId: userId },
        config
    );
    return res.data;
};

const userApi = {
    getAll,
    createUser,
    getUserByUsername,
    getUserByUserId,
    updateUser,
    updatePassword,
    followUser,
    unfollowUser
};
export default userApi;
