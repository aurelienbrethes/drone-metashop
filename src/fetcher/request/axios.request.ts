import axios from 'axios';

const requestApi = axios.create({
    baseURL: process.env.REQUEST_API_URL,
    headers: { Authorization: process.env.REQUEST_API_KEY || '' },
});

export default requestApi;
