import { AxiosInstance, AxiosError } from 'axios';
import { ErrorHandler } from '../../utils/errorHandler';

export const applyErrorInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    null,
    (error: AxiosError) => {
      const errorMessage = ErrorHandler(error);
      ErrorHandler(error);
      return Promise.reject(new Error(errorMessage));
    }
  );
};