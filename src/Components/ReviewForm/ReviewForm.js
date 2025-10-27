import React, { useState, useEffect } from "react";
import "./ReviewForm.css";

const doctorList = [
  { name: "Dr. Jonas Miller", speciality: "Cardiologist", experience: "12", ratings: "4.8", profilePic: "DrJonas.png" },
  { name: "Dr. Lynn Smith", speciality: "Dermatologist", experience: "10", ratings: "4.6", profilePic: "DrLynn.png" },
  { name: "Dr. Mike Jones", speciality: "Orthopedic Surgeon", experience: "8", ratings: "4.7", profilePic: "DrMike.png" },
  { name: "Dr. Luke Smith", speciality: "General Physician", experience: "9", ratings: "4.8", profilePic: "DrLuke.jpg" },
  { name: "Dr. Jane Williams", speciality: "Gynecologist/Obstetrician", experience: "8", ratings: "4.6", profilePic: "DrJane.jpg" },
  { name: "Dr. Brad Wade", speciality: "Dentist", experience: "9", ratings: "4.7", profilePic: "DrBrad.jpg" }
];

function ReviewForm() {
  const [modalOpenIndex, setModalOpenIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", review: "", rating: 0 });
  const [doctorReviews, setDoctorReviews] = useState({});

  // Load saved reviews when component mounts
  useEffect(() => {
    const savedReviews = localStorage.getItem("doctorReviews");
    if (savedReviews) {
      setDoctorReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("doctorReviews", JSON.stringify(doctorReviews));
  }, [doctorReviews]);

  const openModal = (index) => {
    setModalOpenIndex(index);
    setFormData({ name: "", review: "", rating: 0 });
  };

  const closeModal = () => {
    setModalOpenIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (e) => {
    setFormData((prev) => ({ ...prev, rating: parseInt(e.target.value, 10) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.review.trim() && formData.rating > 0) {
      setDoctorReviews((prev) => ({
        ...prev,
        [modalOpenIndex]: { ...formData },
      }));
      closeModal();
    }
  };

  return (
    <div className="review-container">
      <h2 className="review-heading">Reviews</h2>
      <table className="review-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Speciality</th>
            <th>Experience (Years)</th>
            <th>Ratings</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {doctorList.map((doctor, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="doctor-info">
                <img src={doctor.profilePic} alt={doctor.name} className="doctor-pic" />
                <span>{doctor.name}</span>
              </td>
              <td>{doctor.speciality}</td>
              <td>{doctor.experience}</td>
              <td>{doctor.ratings}</td>
              <td>
                <button
                  className="review-btn"
                  disabled={!!doctorReviews[index]}
                  onClick={() => openModal(index)}
                >
                  {doctorReviews[index] ? "Feedback Submitted" : "Click Here"}
                </button>
              </td>
              <td>
                {doctorReviews[index] && (
                  <div className="submitted-review">
                    <strong>{doctorReviews[index].name}:</strong>
                    <span> {doctorReviews[index].review}</span>
                    <br />
                    <span>
                      Rating:{" "}
                      {"★".repeat(doctorReviews[index].rating)}
                      {"☆".repeat(5 - doctorReviews[index].rating)}
                    </span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpenIndex !== null && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Give Your Review</h3>
            <p><strong>{doctorList[modalOpenIndex].name}</strong></p>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Review:
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Rating:
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleRatingChange}
                  required
                >
                  <option value={0}>Select</option>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="review-btn">Submit</button>
              <button type="button" className="modal-close-btn" onClick={closeModal}>
                &times;
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
