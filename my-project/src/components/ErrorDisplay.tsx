import React from 'react';

interface ErrorDisplayProps {
  errorMessage: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMessage }) => {
  return (
    <div className='text-red-600 text-sm flex justify-center border-red-600 border-solid border py-2 rounded-xl bg-red-600 bg-opacity-20'>
      <p>{errorMessage}</p>
    </div>
  );
};