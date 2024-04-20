import axios from 'axios';

const baseURL = 'http://localhost:8000'; // Perbaikan di sini
const instance = axios.create({ baseURL }); // Dan di sini

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { instance };
