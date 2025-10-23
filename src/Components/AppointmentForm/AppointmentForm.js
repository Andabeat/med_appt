import React, { useState } from 'react';
import './AppointmentForm.css';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!phoneNumber.match(/^\d{10}$/)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!appointmentDate) {
      setError('Please select a date.');
      return;
    }
    if (!appointmentTime) {
      setError('Please select a time slot.');
      return;
    }

    // If all fields are valid, clear error and submit
    setError('');
    onSubmit({ name, phoneNumber, appointmentDate, appointmentTime });
    setName('');
    setPhoneNumber('');
    setAppointmentDate('');
    setAppointmentTime('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <h2>Book an Appointment</h2>
      <p>
        {doctorName ? `Dr. ${doctorName}` : 'Doctor'} — {doctorSpeciality}
      </p>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Patient Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentDate">Date:</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          onChange={e => setAppointmentDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentTime">Time Slot:</label>
        <select
          id="appointmentTime"
          value={appointmentTime}
          onChange={e => setAppointmentTime(e.target.value)}
          required
        >
          <option value="">Select a time slot</option>
          <option value="09:00">09:00 AM</option>
          <option value="11:00">11:00 AM</option>
          <option value="14:00">02:00 PM</option>
        </select>
      </div>

      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentForm;
