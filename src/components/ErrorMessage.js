import React from 'react';

const ErrorMessage = ({ text }) => {
  return (
    <div className='error-container'>
      <p>{text}</p>
    </div>
  );
};

export default ErrorMessage;
