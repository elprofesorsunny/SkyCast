import { AxiosError } from 'axios';

export function ErrorHandler(error: unknown): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message || 'Error connecting to the server';
  }
  return 'An unknown error has occurred';
}

export function logError(error: unknown): void {
  console.error('🛑 [Error]', error);
}