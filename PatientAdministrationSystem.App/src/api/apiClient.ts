import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5272',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default apiClient;