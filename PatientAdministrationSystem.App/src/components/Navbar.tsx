import React from 'react';
import { HospitalIcon } from './ui/Icons';
import './Navbar.css';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>
            <HospitalIcon size="lg" className="navbar-hospital-icon" />
            Patient Administration
          </h1>
          <span className="navbar-subtitle">Healthcare Management System</span>
        </div>
        <div className="navbar-actions">
          <button className="navbar-profile-btn" title="Profile">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=healthcare-user&backgroundColor=3182ce"
              alt="Profile"
              className="profile-avatar"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}; 