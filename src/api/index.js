import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const myBaseUrl = import.meta.env.VITE_API_BASE_URL;

const createAxios = axios.create({
  baseURL: myBaseUrl,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

createAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

createAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const store = useAuthStore();
    if (error.response) {
      if (
        error.response.status === 401 ||
        error.response.data.message == "Unauthenticated."
      ) {
        store.logout();
      }
    }
    return Promise.reject(error);
  }
);

export default createAxios;