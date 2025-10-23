// Notification.js
import React from 'react';
import './Notification.css';

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification-box">
      <span>{message}</span>
      <button
        className="notification-close-btn"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
