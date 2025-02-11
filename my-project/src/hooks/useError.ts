import { useState, useEffect } from 'react';
import { showModal, notifyError } from '@utils/notifications';

let isErrorDisplayed = false;

interface ErrorOptions {
  duration?: number;
  type?: 'modal' | 'toast' | 'text';
  color?: string;
}

const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as any;
    const apiMessage = axiosError.response?.data?.message;
    switch (axiosError.response?.status) {
      case 401:
        return apiMessage || "Unauthorized (401)";
      case 404:
        return apiMessage || "City not found (404)";
      default:
        return apiMessage || `Unexpected error: ${axiosError.response.status}`;
    }
  }

  return 'Error connecting to the server';
};

const getErrorOptions = (status: number): ErrorOptions => {
  switch (status) {
    case 401:
      return { type: 'modal', duration: 7000, color: 'red' };
    case 404:
      return { type: 'toast', duration: 5000, color: 'orange' };
    default:
      return { type: 'text', duration: 5000, color: 'black' };
  }
};

export function useError() {
  const [error, setError] = useState<unknown>(null);
  const [options, setOptions] = useState<ErrorOptions>({});

  useEffect(() => {
    if (error) {
      const errorMessage = getErrorMessage(error);
      const status = (error as any)?.response?.status;
      const errorOptions = getErrorOptions(status);

      if (!isErrorDisplayed) {
        switch (errorOptions.type) {
          case 'modal':
            showModal(errorMessage);
            break;
          case 'toast':
            notifyError(errorMessage, errorOptions.color);
            break;
          case 'text':
          default:
            console.error(errorMessage);
            break;
        }
        isErrorDisplayed = true;
      }

      setTimeout(() => {
        isErrorDisplayed = false;
      }, errorOptions.duration || 5000);
    }
  }, [error]);

  const handleError = (error: unknown) => {
    setError(error);
  };

  return { handleError };
}