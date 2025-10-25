import React, { useEffect, useState } from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Retrieve user details from localStorage or API
    const storedName = localStorage.getItem('name') || 'Peter';
    const storedEmail = localStorage.getItem('email') || 'peter@example.com';
    const storedPhone = localStorage.getItem('phone') || '+1234567890';

    setUserDetails({
      name: storedName,
      email: storedEmail,
      phone: storedPhone,
    });
  }, []);

  return (
    <div className="profile-card-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Profile" 
              className="avatar-img"
            />
          </div>
          <h2 className="profile-name">{userDetails.name}</h2>
        </div>
        
        <div className="profile-details">
          <div className="detail-item">
            <label className="detail-label">Email:</label>
            <p className="detail-value">{userDetails.email}</p>
          </div>
          
          <div className="detail-item">
            <label className="detail-label">Phone:</label>
            <p className="detail-value">{userDetails.phone}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn btn-primary edit-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
