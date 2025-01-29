import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../config/api.config';

type InterceptorConfig = {
  additionalParams?: Record<string, any>;
};

export const applyCommonInterceptors = (
  instance: AxiosInstance,
  config?: InterceptorConfig
) => {
  instance.interceptors.request.use((req: InternalAxiosRequestConfig) => {
    req.params = {
      ...req.params,
      appid: API_CONFIG.API_KEY,
      units: API_CONFIG.DEFAULT_PARAMS.UNITS,
      ...config?.additionalParams,
    };
    return req;
  });
};
