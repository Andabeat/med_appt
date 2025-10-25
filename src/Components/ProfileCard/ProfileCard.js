// Import necessary modules from React and other files
import React, { useEffect, useState, useCallback } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import './ProfileCard.css';

// Define a Function component called ProfileCard
const ProfileCard = () => {
  // Set up state variables using the useState hook
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [updatedDetails, setUpdatedDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [editMode, setEditMode] = useState(false);
  
  // Access the navigation functionality from React Router
  const navigate = useNavigate();
  
  // Function to fetch user profile data from the API
  // Wrapped with useCallback to prevent unnecessary re-renders
  const fetchUserProfile = useCallback(async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage

      if (!authtoken) {
        navigate("/login");
      } else {
        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Email": email, // Add the email to the headers
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
          setUpdatedDetails(user);
        } else {
          // Handle error case
          throw new Error("Failed to fetch user profile");
        }
      }
    } catch (error) {
      console.error(error);
      // Handle error case - fallback to sessionStorage
      const storedName = sessionStorage.getItem('name') || sessionStorage.getItem('username') || 'User';
      const storedEmail = sessionStorage.getItem('email') || 'user@example.com';
      const storedPhone = sessionStorage.getItem('phone') || 'Not provided';
      
      setUserDetails({
        name: storedName,
        email: storedEmail,
        phone: storedPhone,
      });
      setUpdatedDetails({
        name: storedName,
        email: storedEmail,
        phone: storedPhone,
      });
    }
  }, [navigate]); // Only recreate if navigate changes

  // Use the useEffect hook to fetch user profile data when the component mounts or updates
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate, fetchUserProfile]); // Now includes fetchUserProfile

  // Function to enable edit mode for profile details
  const handleEdit = () => {
    setEditMode(true);
  };

  // Function to cancel edit mode
  const handleCancel = () => {
    setUpdatedDetails(userDetails); // Reset to original details
    setEditMode(false);
  };

  // Function to update state when user inputs new data
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission when user saves changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Update the user details in session storage
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("username", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);

        setUserDetails(updatedDetails);
        setEditMode(false);
        // Display success message to the user
        alert(`Profile Updated Successfully!`);
        window.location.reload();
      } else {
        // Handle error case
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update profile. Please try again.");
    }
  };

  // Render the profile form with different sections based on edit mode
  return (
    <div className="profile-card-container">
      <div className="profile-card">
        {editMode ? (
          // Edit Mode - Form for editing profile
          <form className="profile-edit-form" onSubmit={handleSubmit}>
            <div className="profile-header">
              <div className="profile-avatar">
                <img 
                  src="/default-avatar.png" 
                  alt="Profile" 
                  className="avatar-img"
                />
              </div>
              <h2 className="profile-name">Edit Profile</h2>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <label className="detail-label">
                  Email
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={userDetails.email}
                    disabled // Disable the email field
                  />
                </label>
              </div>

              <div className="detail-item">
                <label className="detail-label">
                  Name
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={updatedDetails.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <div className="detail-item">
                <label className="detail-label">
                  Phone
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={updatedDetails.phone}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
            </div>

            <div className="profile-actions">
              <button type="submit" className="btn btn-primary edit-btn">
                Save Changes
              </button>
              <button 
                type="button" 
                className="btn btn-secondary cancel-btn" 
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          // Display Mode - Show profile details
          <>
            <div className="profile-header">
              <div className="profile-avatar">
                <img 
                  src="/default-avatar.png"  
                  alt="Profile" 
                  className="avatar-img"
                />
              </div>
              <h2 className="profile-name">Welcome, {userDetails.name}</h2>
            </div>
            
            <div className="profile-details">
              <div className="detail-item">
                <p><b>Email:</b> {userDetails.email}</p>
              </div>
              
              <div className="detail-item">
                <p><b>Phone:</b> {userDetails.phone}</p>
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn btn-primary edit-btn" onClick={handleEdit}>
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Export the ProfileCard component as the default export
export default ProfileCard;
