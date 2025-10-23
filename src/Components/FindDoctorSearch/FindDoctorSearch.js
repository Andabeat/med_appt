import React, { useState } from 'react';
import './FindDoctorSearch.css';
import DoctorCard from '../DoctorCard/DoctorCard';

const initSpeciality = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Orthopedic Surgeon',
  'Cardiologist'
];

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

const FindDoctorSearch = () => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [specialities] = useState(initSpeciality);

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
  };

  // Filter doctors based on current search input or selection
  const filteredDoctors = doctorList.filter(doctor =>
    searchDoctor === '' ||
    doctor.speciality.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  return (
    <div className="finddoctor">
      <center>
        <h1>Find a doctor and Consult instantly</h1>
        <div>
          <img
            src={process.env.PUBLIC_URL + '/character-7166558_1280.png'}
            alt="Doctor Search Banner"
            style={{ width: '280px', height: '280px', objectFit: 'cover' }}
          />
        </div>

        <div
          className="home-search-container"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div className="doctor-search-box">
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals, etc."
              onFocus={() => setDoctorResultHidden(false)}
              onBlur={() => setTimeout(() => setDoctorResultHidden(true), 120)}
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
            />

            <div className="findiconimg">
              <i className="fa fa-search findIcon"></i>
            </div>

            <div className={`search-doctor-input-results${doctorResultHidden ? " hide" : ""}`}>
              {specialities.map((speciality) => (
                <div
                  className="search-doctor-result-item"
                  key={speciality}
                  onMouseDown={() => handleDoctorSelect(speciality)}
                >
                  <span>
                    <img
                      src={process.env.PUBLIC_URL + '/search.svg'}
                      alt=""
                      style={{ height: '10px', width: '10px' }}
                    />
                  </span>
                  <span>{speciality}</span>
                  <span>SPECIALITY</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ margin: "30px 0 10px 0" }}>
          <h2 style={{ fontWeight: "bold", margin: "0 0 8px 0" }}>
            {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} available
          </h2>
          <div style={{ fontWeight: "600", color: "#444" }}>
            Book appointments with minimum wait-time &amp; verified doctor details
          </div>
        </div>

        <div className="doctor-card-row">
          {filteredDoctors.length === 0 ? (
            <p>No doctors found for this specialty.</p>
          ) : (
            filteredDoctors.map(doctor => (
              <DoctorCard
                key={doctor.name}
                name={doctor.name}
                speciality={doctor.speciality}
                experience={doctor.experience}
                ratings={doctor.ratings}
                profilePic={doctor.profilePic}
              />
            ))
          )}
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearch;

