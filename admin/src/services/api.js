import axios from 'axios';

const API_BASE = 'http://localhost:5000';

const api = axios.create({ baseURL: API_BASE });

// Attach JWT token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Public
export const getPublicSamethalu = (params) => api.get('/api/samethalu', { params });
export const getStats = () => api.get('/admin/stats');

// Auth
export const adminLogin = (password) => api.post('/admin/login', { password });

// Admin CRUD
export const listSamethalu = (params) => api.get('/admin/sametha/list', { params });
export const getSamethaById = (id) => api.get(`/admin/sametha/${id}`);
export const addSametha = (data) => api.post('/admin/sametha', data);
export const updateSametha = (id, data) => api.put(`/admin/sametha/${id}`, data);
export const deleteSametha = (id) => api.delete(`/admin/sametha/${id}`);

export default api;
