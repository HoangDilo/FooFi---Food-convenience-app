import {getAccessToken} from '@/utils/storage';
import axios from 'axios';

// const BASE_URL = 'http://192.168.2.33:8080/api';
const BASE_URL = 'http://192.168.1.250:8080/api';
const TIME_OUT = 10000;
const HEADERS = {
  'content-type': 'application/json',
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: HEADERS,
});

apiClient.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error),
);

export const apiClientToken = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: HEADERS,
});

apiClientToken.interceptors.request.use(
  async config => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClientToken.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  },
);
