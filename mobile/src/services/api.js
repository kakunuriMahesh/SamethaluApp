import axios from 'axios';

// Change this to your machine's LAN IP when testing on a physical device
// e.g., 'http://192.168.1.100:5000'
// const BASE_URL = 'http://192.168.0.21:5000';
const BASE_URL = 'https://samethaluapp.onrender.com';

const api = axios.create({ baseURL: BASE_URL, timeout: 10000 });

export const getAllSamethalu = (params) => api.get('/api/samethalu', { params });
export const getSamethaById = (id) => api.get(`/api/samethalu/${id}`);
export const searchSamethalu = (q) => api.get('/api/samethalu/search', { params: { q } });
export const getSamethaByCategory = (category, params) => api.get(`/api/samethalu/category/${category}`, { params });
export const getRandomSametha = () => api.get('/api/samethalu/random');
export const getSamethaOfTheDay = () => api.get('/api/samethalu/day');
export const getCategories = () => api.get('/api/samethalu/categories');

export default api;
