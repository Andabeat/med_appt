import React from "react";
import "./ReviewForm.css";

const doctorList = [
  {
    name: "Dr. Jonas Miller",
    speciality: "Cardiologist",
    experience: "12",
    ratings: "4.8",
    profilePic: "DrJonas.png"
  },
  {
    name: "Dr. Lynn Smith",
    speciality: "Dermatologist",
    experience: "10",
    ratings: "4.6",
    profilePic: "DrLynn.png"
  },
  {
    name: "Dr. Mike Jones",
    speciality: "Orthopedic Surgeon",
    experience: "8",
    ratings: "4.7",
    profilePic: "DrMike.png"
  },
  {
    name: "Dr. Luke Smith",
    speciality: "General Physician",
    experience: "9",
    ratings: "4.8",
    profilePic: "DrLuke.jpg"
  },
  {
    name: "Dr. Jane Williams",
    speciality: "Gynecologist/Obstetrician",
    experience: "8",
    ratings: "4.6",
    profilePic: "DrJane.jpg"
  },
  {
    name: "Dr. Brad Wade",
    speciality: "Dentist",
    experience: "9",
    ratings: "4.7",
    profilePic: "DrBrad.jpg"
  }
];

function ReviewForm() {
  const handleFeedbackClick = (doctor) => {
    alert(`Provide feedback for ${doctor.name}`);
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
                <img
                  src={doctor.profilePic}
                  alt={doctor.name}
                  className="doctor-pic"
                />
                <span>{doctor.name}</span>
              </td>
              <td>{doctor.speciality}</td>
              <td>{doctor.experience}</td>
              <td>{doctor.ratings}</td>
              <td>
                <button
                  className="review-btn"
                  onClick={() => handleFeedbackClick(doctor)}
                >
                  Click Here
                </button>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewForm;
