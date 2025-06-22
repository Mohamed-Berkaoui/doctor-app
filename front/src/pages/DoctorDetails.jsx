import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DoctorDetails.css";
import appAxios from "../utils/appAxios";
import { toast } from "react-toastify";
import ReservationPopUp from "../components/ReservationPopUp";

function DoctorDetails() {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await appAxios.get(`/auth/${id}`);
        if (response.data.status !== "success") {
          toast.error("Failed to fetch doctor details");
          return;
        }
        const data = response.data.data;
        setDoctor(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
        setDoctor(null);
        setLoading(false);
        toast.error("Failed to fetch doctor details");
      }
    };
    fetchDoctorDetails();
  }, [id]);

  if (!doctor) return <div className="loading">Loading...</div>;

  return (
    <section className="doctor-details">
      <header className="doctor-header">
        <div className="avatar">{doctor.name[0].toUpperCase()}</div>
        <div>
          <h1 className="doctor-name">Dr. {doctor.name}</h1>
          <span className="doctor-specialty">{doctor.specialty}</span>
        </div>
      </header>
      <main className="doctor-main">
        <ul className="doctor-contact">
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${doctor.email}`}>{doctor.email}</a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a href={`tel:${doctor.phone}`}>{doctor.phone}</a>
          </li>
        </ul>
        <p className="doctor-description">{doctor.description}</p>
        <div className="doctor-schedule">
          <div>
            <strong>Working Hours:</strong>
            <span className="badge">
              {doctor.workingHours?.start} - {doctor.workingHours?.end}
            </span>
          </div>
          <div>
            <strong>Work Days:</strong>
            <div className="days-list">
              {doctor.workingDays.map((day) => (
                <span className="day-badge" key={day}>
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button className="btn-primary" onClick={() => setShowPopup(true)}>
          Reserve Appointment
        </button>
      </main>
      {showPopup && (
        <ReservationPopUp
          isOpen={showPopup}
          setShowPopUp={setShowPopup}
          doctor={doctor}
        />
      )}
    </section>
  );
}

export default DoctorDetails;
