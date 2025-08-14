import React from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  type?: 'welcome' | 'no-results' | 'error';
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'welcome',
  icon,
  title,
  description,
  action
}) => {
  const getDefaultIcon = () => {
    switch (type) {
      case 'welcome':
        return '🏥';
      case 'no-results':
        return '🔍';
      case 'error':
        return '❌';
      default:
        return '📋';
    }
  };

  return (
    <div className={`empty-state empty-state--${type}`}>
      <div className="empty-state__icon">
        {icon || getDefaultIcon()}
      </div>
      <h3 className="empty-state__title">{title}</h3>
      {description && (
        <p className="empty-state__description">{description}</p>
      )}
      {action && (
        <div className="empty-state__action">
          {action}
        </div>
      )}
    </div>
  );
}; 