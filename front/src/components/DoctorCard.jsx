import React from "react";
import { Link } from "react-router-dom";



function DoctorCard({ doc }) {
    console.log(doc)
    return (
        <div className="doctor-card-modern">
            <div className="doctor-card-header">
                <div className="doctor-avatar">
                    <span role="img" aria-label="Doctor">🩺</span>
                </div>
                <div>
                    <h2 className="doctor-name">Dr. {doc.name}</h2>
                    <h5 className="doctor-specialty">{doc.specialty}</h5>
                    <p className="doctor-email-card ">{doc.email}</p>
                </div>
            </div>
            <div className="doctor-card-body">
                <div className="doctor-info-row">
                    <span className="doctor-info-label">Phone:</span>
                    <span>{doc.phone}</span>
                </div>
                <div className="doctor-info-row">
                    <span className="doctor-info-label">Working Hours:</span>
                    <span>
                        {doc.workingHours.start} - {doc.workingHours.end}
                    </span>
                </div>
                <div className="doctor-info-row">
                    <span className="doctor-info-label">Work Days:</span>
                    <span>
                        {doc.workingDays?.map((day, idx) => (
                            <span
                                key={idx}
                                style={{
                                    display: "inline-block",
                                    background: "#e0e7ff",
                                    color: "#3730a3",
                                    borderRadius: "12px",
                                    padding: "2px 10px",
                                    marginRight: "6px",
                                    fontSize: "0.85em",
                                    fontWeight: 500,
                                }}
                            >
                                {day}
                            </span>
                        ))}
                    </span>
                </div>
                <div className="doctor-info-row">
                    <span className="doctor-info-label">Description:</span>
                    <span>{doc.description}</span>
                </div>
            </div>
            <div className="doctor-card-footer">
                <Link to={`/doctor/${doc._id}`}>
                    <button className="doctor-more-btn">More Information</button>
                </Link>
            </div>
        </div>
    );
}

export default DoctorCard;