import React from 'react';

interface IconProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const iconSizes = {
  sm: '0.875rem',
  md: '1rem', 
  lg: '1.25rem'
};

export const HospitalIcon: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
  <span 
    className={`icon icon-hospital ${className}`}
    style={{ fontSize: iconSizes[size] }}
  >
    🏥
  </span>
);

export const UserIcon: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
  <span 
    className={`icon icon-user ${className}`}
    style={{ fontSize: iconSizes[size] }}
  >
    👤
  </span>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
  <span 
    className={`icon icon-search ${className}`}
    style={{ fontSize: iconSizes[size] }}
  >
    🔎
  </span>
);

export const EmailIcon: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
  <span 
    className={`icon icon-email ${className}`}
    style={{ fontSize: iconSizes[size] }}
  >
    ✉️
  </span>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
  <span 
    className={`icon icon-calendar ${className}`}
    style={{ fontSize: iconSizes[size] }}
  >
    📅
  </span>
);

export const DocumentIcon: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
  <span 
    className={`icon icon-document ${className}`}
    style={{ fontSize: iconSizes[size] }}
  >
    📋
  </span>
);

export const LoadingIcon: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
  <span 
    className={`icon icon-loading ${className}`}
    style={{ fontSize: iconSizes[size] }}
  >
    ⏳
  </span>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
  <span 
    className={`icon icon-close ${className}`}
    style={{ fontSize: iconSizes[size] }}
  >
    ✕
  </span>
);

export const ErrorIcon: React.FC<IconProps> = ({ size = 'md', className = '' }) => (
  <span 
    className={`icon icon-error ${className}`}
    style={{ fontSize: iconSizes[size] }}
  >
    ⚠️
  </span>
); 