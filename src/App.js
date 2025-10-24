import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
import SignUp from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import Notification from './Components/Notification/Notification';
import ReviewForm from './Components/ReviewForm/ReviewForm';

function App() {
  // Global notification state
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Global handler for booking/cancel actions to trigger notification
  const handleGlobalAppointment = (doctor, patient, date, time) => {
    setNotificationMessage(
      `Appointment booked!\nDoctor: ${doctor}\nPatient: ${patient}\nDate: ${date}\nTime: ${time}`
    );
    setShowNotification(true);
  };

  // Handler to dismiss notification
  const handleNotificationClose = () => {
    setShowNotification(false);
    setNotificationMessage('');
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        {/* Global Notification: Visible across all routes */}
        {showNotification && (
          <Notification
            message={notificationMessage}
            onClose={handleNotificationClose}
          />
        )}

        <Routes>
          {/* Main routes. Pass the handler to FindDoctorSearch */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/find-doctor"
            element={
              <FindDoctorSearch onBookAppointment={handleGlobalAppointment} />
            }
          />
          <Route path="/reviews" element={<ReviewForm />} />
         
          {/* 404 fallback route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
