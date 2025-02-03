import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { applyCommonInterceptors } from './interceptors/common';
import { applyLoggingInterceptor } from './interceptors/logging';
import { applyErrorInterceptor } from './interceptors/error';

const apiClient = axios.create({
//   timeout: 10000,
});

applyCommonInterceptors(apiClient);
applyLoggingInterceptor(apiClient);
applyErrorInterceptor(apiClient);

const APIService = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return await apiClient.get<T>(url, config);
  },

  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return await apiClient.post<T>(url, data, config);
  },

  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return await apiClient.put<T>(url, data, config);
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return await apiClient.delete<T>(url, config);
  },
};

export default APIService;