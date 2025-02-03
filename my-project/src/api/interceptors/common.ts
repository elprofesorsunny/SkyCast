import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = "https://api.openweathermap.org";
export const API_KEY = "ef827831237dbae7257b7b7499242373a";

export const applyCommonInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use((req: InternalAxiosRequestConfig) => {
    req.baseURL = BASE_URL;
    req.params = {
      ...req.params,
      appid: API_KEY
    };
    return req;
  });
};
