import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./DoctorRegister.css";
import appAxios from "../utils/appAxios";

const specialties = ["general", "cardiology", "neurology", "orthopedics"];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function DoctorRegister() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    email: "",
    password: "",
    phone: "",
    specialty: "general",
    workingHours: { start: "09:00", end: "17:00" },
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "workingDays") {
      let updatedDays = [...form.workingDays];
      if (checked) {
        updatedDays.push(value);
      } else {
        updatedDays = updatedDays.filter((day) => day !== value);
      }
      setForm({ ...form, workingDays: updatedDays });
    } else if (name === "start" || name === "end") {
      setForm({
        ...form,
        workingHours: { ...form.workingHours, [name]: value },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await appAxios.post("/auth/register", {
        ...form,
        phone: form.phone ? Number(form.phone) : undefined,
      });

      if (!res.data || res.data.status !== "success") {
         return toast.error("Registration failed. Please try again.");
      }
      toast.success("Registration successful! Please login.");
      navigate("/dashbord/login");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="doctor-register-container">
      <form className="doctor-register-form" onSubmit={handleSubmit}>
         <div className="login-link">
          Already have an account? <Link to="/dashboard/login">Login</Link>
        </div>
        <h2>Doctor Registration</h2>
        {error && <div className="error">{error}</div>}
        <label>
          Name*
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="No description provided"
          />
        </label>
        <label>
          Email*
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password*
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Optional"
          />
        </label>
        <label>
          Specialty
          <select
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
          >
            {specialties.map((spec) => (
              <option key={spec} value={spec}>
                {spec.charAt(0).toUpperCase() + spec.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <div className="working-hours">
          <label>
            Working Hours Start
            <input
              type="time"
              name="start"
              value={form.workingHours.start}
              onChange={handleChange}
            />
          </label>
          <label>
            End
            <input
              type="time"
              name="end"
              value={form.workingHours.end}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="working-days">
          <span>Working Days</span>
          <div className="days-checkboxes">
            {daysOfWeek.map((day) => (
              <label key={day}>
                <input
                  type="checkbox"
                  name="workingDays"
                  value={day}
                  checked={form.workingDays.includes(day)}
                  onChange={handleChange}
                />
                {day}
              </label>
            ))}
          </div>
        </div>
        <button type="submit">Register</button>
     
      </form>
    </div>
  );
}
