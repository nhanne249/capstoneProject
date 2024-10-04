import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => config);

api.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);

export default api;