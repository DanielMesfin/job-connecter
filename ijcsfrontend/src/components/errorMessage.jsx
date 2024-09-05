import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <p className="text-xs text-red-500 mt-1">
      {error && error.message}
    </p>
  );
};

export default ErrorMessage;