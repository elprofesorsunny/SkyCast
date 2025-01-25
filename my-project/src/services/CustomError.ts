export interface CustomError {
    type: 'network' | 'server' | 'unknown';
    message: string;
    details?: {
      status?: number;
      url?: string;
      timestamp?: string;
    };
  }
  