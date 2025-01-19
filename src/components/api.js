import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Base URL do backend
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Recupera o token do localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;