import React from 'react';

const Alert = ({ text }) => {
  return (
    <div className={text ? 'bottom-alert bottom-alert-active' : 'bottom-alert'}>
      <p>{text}</p>
    </div>
  );
};

export default Alert;
