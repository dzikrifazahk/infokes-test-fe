import { useRuntimeConfig } from '#app';
import { useCookie } from '#app';
import type { AxiosInstance } from 'axios';
import axios from 'axios';

export const BaseServiceApi = () => {
  const config = useRuntimeConfig();

  const httpClient: AxiosInstance = axios.create({
    baseURL: String(config.public.baseUrl),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  httpClient.interceptors.request.use((config) => {
    const token = useCookie('auth-token').value;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );

  return { httpClient };
};
