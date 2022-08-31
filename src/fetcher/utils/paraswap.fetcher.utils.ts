import axios from 'axios';

const paraswapApi = axios.create({
    baseURL: process.env.PARASWAP_API_URL,
});

export default paraswapApi;
