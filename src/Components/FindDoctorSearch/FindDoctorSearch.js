import React, { useState } from 'react';
import './FindDoctorSearch.css';
import DoctorCard from '../DoctorCard/DoctorCard';
import { useNavigate } from 'react-router-dom';   // <-- removed Navigate (unused)

const initSpeciality = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ent) Specialist',
  'Homeopath',
  'Ayurveda'
];

const FindDoctorSearch = () => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [specialities, setSpecialities] = useState(initSpeciality);
  const navigate = useNavigate();

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    navigate(`/instant-consultation?speciality=${speciality}`);
  };

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
              onBlur={() => setDoctorResultHidden(true)}
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
            />

            <div className="findiconimg">
              <i className="fa fa-search findIcon"></i>
            </div>

            <div className="search-doctor-input-results" hidden={doctorResultHidden}>
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
        <h2 style={{ fontWeight: "bold", margin: "0 0 8px 0" }}>8 doctors available in</h2>
        <div style={{ fontWeight: "600", color: "#444" }}>
          Book appointments with minimum wait-time &amp; verified doctor details
        </div>
      </div>

        {/* Doctor cards */}
        <DoctorCard
          name="Dr. Jonas Miller"
          speciality="Cardiologist"
          experience="12"
          ratings="4.8"
          profilePic="DrJonas.png"
        />

        <DoctorCard
          name="Dr. Lynn Smith"
          speciality="Dermatologist"
          experience="10"
          ratings="4.6"
          profilePic="DrLynn.png"
        />

        <DoctorCard
          name="Dr. Mike Jones"
          speciality="Orthopedic Surgeon"
          experience="8"
          ratings="4.7"
          profilePic="DrMike.png"
        />
      </center>
    </div>
  );
};

export default FindDoctorSearch;
