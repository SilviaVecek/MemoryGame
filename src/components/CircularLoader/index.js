import React from 'react';
import '../CircularLoader/index.css';

const CircularLoading = () => (
  <svg 
  className="spinner"
  width='100px'
  height='100px'
  color='#edecf5'
  viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </svg>
);

export default CircularLoading;