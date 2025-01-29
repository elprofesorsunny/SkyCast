import { AxiosInstance } from 'axios';

export const applyLoggingInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(req => {
    console.log(`🌐 [${req.method?.toUpperCase()}] ${req.url}`);
    return req;
  });

  instance.interceptors.response.use(res => {
    console.log(`✅ [${res.status}] ${res.config.url}`);
    return res;
  });
};