import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  center?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  center = false
}) => {
  return (
    <div className={`loading-spinner-container ${center ? 'loading-spinner-container--center' : ''}`}>
      <div className={`loading-spinner loading-spinner--${size}`}></div>
      {text && <span className="loading-spinner__text">{text}</span>}
    </div>
  );
}; 