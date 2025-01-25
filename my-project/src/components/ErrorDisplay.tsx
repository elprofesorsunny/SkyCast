import React from 'react';
import { CustomError } from '../services/CustomError';

interface Props {
  error: CustomError;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<Props> = ({ error, onRetry }) => {
  const getErrorTitle = () => {
    switch (error.type) {
      case 'network':
        return 'Network Error';
      case 'server':
        return 'Server Error';
      default:
        return 'Unknown Error';
    }
  };

  return (
    <div className="bg-red-100 p-4 rounded-lg border border-red-200 shadow">
      <h3 className="text-red-600 font-bold text-lg mb-2">{getErrorTitle()}</h3>
      <p className="text-red-700">{error.message}</p>
      
      {error.details && (
        <div className="mt-2 text-sm text-red-600">
          {error.details.status && <p>Error Code: {error.details.status}</p>}
          {error.details.url && <p>URL: {error.details.url}</p>}
          {error.details.timestamp && <p>Time: {error.details.timestamp}</p>}
        </div>
      )}

      {onRetry && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
