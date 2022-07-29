import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3001/api/auth';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '/api/auth';
}

const register = async (body) => {
    const res = await axios.post(`${baseUrl}/register`, body);
    console.log(res.data);
    return res.data;
};

const login = async (body) => {
    const res = await axios.post(`${baseUrl}/login`, body);
    return res.data;
};

const authApi = { login, register };

export default authApi;
