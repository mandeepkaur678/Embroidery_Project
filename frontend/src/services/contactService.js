import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const contactApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAuthHeaders = () => {
  const token = localStorage.getItem('artful_access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const submitContactMessage = async (payload) => {
  const response = await contactApi.post('/contact', payload);
  return response.data;
};

export const getContactMessages = async (params = {}) => {
  const response = await contactApi.get('/contact', {
    params,
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getContactMessageById = async (id) => {
  const response = await contactApi.get(`/contact/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateContactMessageStatus = async (id, status) => {
  const response = await contactApi.patch(`/contact/${id}/status`, { status }, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const deleteContactMessage = async (id) => {
  const response = await contactApi.delete(`/contact/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
