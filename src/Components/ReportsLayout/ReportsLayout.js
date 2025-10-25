import React from "react";
import "./ReportsLayout.css";

// Table data (for display only)
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
  }
];

const ReportsLayout = () => {
  // Define the public path for the PDF report
  const pdfURL = "/patient_report.pdf"; // file stored in public folder

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
          {reports.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.doctorName}</td>
              <td>{report.speciality}</td>
              <td>
                {/* Opens PDF in a new tab */}
                <a
                  href={pdfURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="report-btn view-btn"
                >
                  View Report
                </a>
              </td>
              <td>
                {/* Downloads the PDF file */}
                <a
                  href={pdfURL}
                  download="patient_report.pdf"
                  className="report-btn download-btn"
                >
                  Download Report
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
