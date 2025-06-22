import React, { useState, useEffect } from "react";
import "./Doctors.css";
import DoctorCard from "../components/DoctorCard";
import DoctorFilter from "../components/DoctorFilter";
import appAxios from "../utils/appAxios";
import { toast } from "react-toastify";


const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await appAxios.get("/auth/"); 
        console.log(response)
        if (!response.data.status=== "success"  ) {
          toast.error("Failed to fetch doctors");
          return;
        }
        const data =  response.data.data;
        setDoctors(data);
      } catch (error) {
        toast.error("Failed to fetch doctors");
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doc) => {
    const nameMatch = doc.name.toLowerCase().includes(nameFilter.toLowerCase());
    const specialtyMatch = doc.specialty
      .toLowerCase()
      .includes(specialtyFilter.toLowerCase());
    return nameMatch && specialtyMatch;
  });

  return (
    <div className="doctors-page">
      <h1>Doctors</h1>
      <DoctorFilter
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        specialtyFilter={specialtyFilter}
        setSpecialtyFilter={setSpecialtyFilter}
      />
      <div className="doctors-list">
        {filteredDoctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          filteredDoctors.map((doc) => <DoctorCard key={doc._id} doc={doc} />)
        )}
      </div>
    </div>
  );
};

export default Doctors;
