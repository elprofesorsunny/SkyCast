import { AxiosError } from 'axios';
import { notifyError } from './notification'; // Import notification helper

export function ErrorHandler(error: unknown): string {
  console.log(error);
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError;
    
    if (axiosError.response) {
      console.log(axiosError.response.data);
      const apiMessage = (axiosError.response.data as { message?: string })?.message;
      // console.log(apiMessage);
      switch (axiosError.response.status) {
        case 401:
          return apiMessage || "Unauthorized access (401)";
        case 404:
          return apiMessage || "City not found (404)";
        default:
          return apiMessage || `Unexpected error: ${axiosError.response.status}`;
      }
    }
    return axiosError.message || 'Error connecting to the server';

  }

  return typeof error === 'string' ? error : String(error);
}

export function logError(error: unknown): void {
  console.error('🛑 [Error]', error);
}

export function handleError(error: unknown): void {
  const errorMessage = ErrorHandler(error);
  // console.log(errorMessage);
  notifyError(errorMessage);
  // logError(error);
}