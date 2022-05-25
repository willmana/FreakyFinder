import axios from 'axios';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3001/api/login';
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '/api/login';
}

const login = async (credentials) => {
    if (process.env.NODE_ENV === 'development') {
        return '1';
    }
    const res = await axios.post(baseUrl, credentials).then((returndata) => {});
    return res.data;
};

const loginApi = { login };

export default loginApi;
