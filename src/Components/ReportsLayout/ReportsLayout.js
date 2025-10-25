import React from "react";
import "./ReportsLayout.css";

// Dummy data: Use only the doctor names & specialties for demo purposes
const reports = [
  {
    id: 1,
    doctorName: "Dr. Jonas Miller",
    speciality: "Cardiologist",
  },
  {
    id: 2,
    doctorName: "Dr. Lynn Smith",
    speciality: "Dermatologist",
  },
  {
    id: 3,
    doctorName: "Dr. Mike Jones",
    speciality: "Orthopedic Surgeon",
  },
  {
    id: 4,
    doctorName: "Dr. Luke Smith",
    speciality: "General Physician",
  },
  {
    id: 5,
    doctorName: "Dr. Jane Williams",
    speciality: "Gynecologist/Obstetrician",
  },
  {
    id: 6,
    doctorName: "Dr. Brad Wade",
    speciality: "Dentist",
  }
];

const ReportsLayout = () => {
  return (
    <div className="reports-layout-container">
      <h1 className="reports-title">Reports</h1>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, idx) => (
            <tr key={report.id}>
              <td>{idx + 1}</td>
              <td>{report.doctorName}</td>
              <td>{report.speciality}</td>
              <td>
                <button className="report-btn view-btn">View Report</button>
              </td>
              <td>
                <button className="report-btn download-btn">Download Report</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
