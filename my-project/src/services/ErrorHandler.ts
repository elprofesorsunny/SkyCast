import axios from 'axios';

export interface CustomError {
  type: 'network' | 'server' | 'unknown';
  message: string;
  details?: {
    status?: number;
    url?: string;
    timestamp?: string;
  };
}

export const ErrorHandler = {
  handle(error: unknown): CustomError {
    const errorObj: CustomError = {
      type: 'unknown',
      message: 'An unexpected error occurred',
    };

    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      errorObj.type = error.response ? 'server' : 'network';
      errorObj.message =
        error.response?.data?.message ||
        error.message ||
        'Failed to connect to the server';

      errorObj.details = {
        status: error.response?.status,
        url: error.config?.url,
        timestamp: new Date().toISOString(),
      };
      return errorObj;
    }

    // Handle generic errors
    if (error instanceof Error) {
      errorObj.message = error.message || JSON.stringify(error);
      return errorObj;
    }

    // Handle unknown errors
    errorObj.message = typeof error === 'object' ? JSON.stringify(error) : String(error);
    return errorObj;
  },
  log(error: CustomError, context?: string): void {
    console.error(`[${context || 'Global'}] Error:`, {
      type: error.type,
      message: error.message,
      details: error.details,
    });
  },
};
