import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const client = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Configurar un interceptor para añadir el token a cada petición
client.interceptors.request.use(config => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

export const api = {
  get: (url, config = {}) => client.get(url, config),
  post: (url, data, config = {}) => client.post(url, data, config),
  put: (url, data, config = {}) => client.put(url, data, config),
  delete: (url, config = {}) => client.delete(url, config),
};

export default api;