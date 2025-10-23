import React, { useState } from 'react';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import './DoctorCard.css';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showForm, setShowForm] = useState(false);

  // Handle Book Appointment click
  const handleBookClick = () => setShowForm(true);

  // Handle form submission
  const handleFormSubmit = (formData) => {
    // For now, just show a confirmation alert
    alert(
      `Appointment booked with Dr. ${name} for ${formData.appointmentDate} at ${formData.appointmentTime}. Patient: ${formData.name}, Phone: ${formData.phoneNumber}`
    );
    setShowForm(false); // Optionally reset form display
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <img
            src={process.env.PUBLIC_URL + '/' + profilePic}
            alt={name}
            className="doctor-card-profile-image"
          />
        </div>

        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-consultationfees">
            Ratings:&nbsp;
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star-half-o"></i>
            &nbsp;({ratings})
          </div>
        </div>

        <div>
          {!showForm ? (
            <button className="book-appointment-btn" onClick={handleBookClick}>
              <div>Book Appointment</div>
              <div>No Booking Fee</div>
            </button>
          ) : (
            <AppointmentForm
              doctorName={name}
              doctorSpeciality={speciality}
              onSubmit={handleFormSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
