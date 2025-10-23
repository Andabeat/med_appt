// Notification.js
// This component displays appointment notifications and hides them when a booking is canceled.

import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
  // State variables for login, user info, appointment details, and visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(true); // controls visibility

  // useEffect hook to load data from storage on mount
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) setDoctorData(storedDoctorData);
    if (storedAppointmentData) setAppointmentData(storedAppointmentData);
  }, []);

  // Event listener or effect to check if booking is canceled
  useEffect(() => {
    const handleCancellation = () => {
      const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
      const updatedAppointment = JSON.parse(localStorage.getItem(storedDoctorData?.name));

      // If appointment removed or marked canceled, hide the notification
      if (!updatedAppointment || updatedAppointment.status === 'canceled') {
        setShowNotification(false);
        setAppointmentData(null);
      }
    };

    // Simulate listener for cancellation via custom event (for modular React systems)
    window.addEventListener('appointmentCanceled', handleCancellation);

    return () => {
      window.removeEventListener('appointmentCanceled', handleCancellation);
    };
  }, []);

  return (
    <div className="notification-container">
      <Navbar />
      {children}

      {/* Show notification only if logged in, appointment exists, and showNotification is true */}
      {isLoggedIn && appointmentData && showNotification && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>
            <p className="appointment-card__message">
              <strong>Patient:</strong> {username}
            </p>
            <p className="appointment-card__message">
              <strong>Doctor:</strong> {doctorData?.name}
            </p>
            <p className="appointment-card__message">
              <strong>Date:</strong> {appointmentData.date}
            </p>
            <p className="appointment-card__message">
              <strong>Time:</strong> {appointmentData.time}
            </p>
            <button 
              className="appointment-card__cancel-btn"
              onClick={() => {
                // Simulate cancellation and update state
                setShowNotification(false);
                localStorage.removeItem(doctorData?.name);
                const cancelEvent = new Event('appointmentCanceled');
                window.dispatchEvent(cancelEvent);
              }}
            >
              Cancel Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
