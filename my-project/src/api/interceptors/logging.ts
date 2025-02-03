import { AxiosInstance } from 'axios';

export const applyLoggingInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(req => {
    console.log(`🌐 [${req.method?.toUpperCase()}] ${req.url}`, {
      params: req.params,
      data: req.data
    });
    return req;
  });

  instance.interceptors.response.use(res => {
    console.log(`✅ [${res.status}] ${res.config.url}`, {
      data: res.data,
      headers: res.headers
    });
    return res;
  });
};