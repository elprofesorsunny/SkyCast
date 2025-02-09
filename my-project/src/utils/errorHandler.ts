import { AxiosError } from 'axios';
import { notifyError } from './notification'; // Import notification helper
import { showModal } from './modal'; // Import modal helper

let isErrorDisplayed = false;

export function ErrorHandler(error: unknown): string {
  console.log(error);
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError;

    // Check for network errors
    if (!axiosError.response) {
      if (axiosError.code === 'ECONNABORTED') {
        if (!isErrorDisplayed) {
          showModal('Request timed out. Please try again.');
          isErrorDisplayed = true;
        }
        return 'Request timed out. Please try again.';
      }
      if (!isErrorDisplayed) {
        showModal('Network error. Please check your internet connection.');
        isErrorDisplayed = true;
      }
      return 'Network error. Please check your internet connection.';
    }

    if (axiosError.response) {
      console.log(axiosError.response.data);
      const apiMessage = (axiosError.response.data as { message?: string })?.message;
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
  if (!isErrorDisplayed) {
    if (errorMessage.includes('Network error') || errorMessage.includes('Request timed out')) {
      showModal(errorMessage);
    } else {
      notifyError(errorMessage);
    }
    isErrorDisplayed = true;
  }
  // Reset the flag after a delay to allow new errors to be displayed
  setTimeout(() => {
    isErrorDisplayed = false;
  }, 5000);
}