import React, { useState } from "react";
import Modal from "react-modal";
import appAxios from "../utils/appAxios";
import { toast } from "react-toastify";
Modal.setAppElement("#root");

function ReservationPopUp({ isOpen, setShowPopUp, doctor }) {
  const [form, setForm] = useState({
    patient: { name: "", email: "", phone: "" },
    date: "",
    time: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["name", "email", "phone"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        patient: { ...prev.patient, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent multiple submissions
    const selectedDate = new Date(form.date);
    const selectedTime = form.time;
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const selectedDayName = daysOfWeek[selectedDate.getDay()];

    // Check if selected day is in doctor's working days
    if (!doctor.workingDays.includes(selectedDayName)) {
        setError("Selected date is not within doctor's working days.");
        toast.error("Selected date is not within doctor's working days.");
        return;
    }

    // Check if selected time is within doctor's working hours
    const [startHour, startMinute] = doctor.workingHours.start.split(":").map(Number);
    const [endHour, endMinute] = doctor.workingHours.end.split(":").map(Number);
    const [selectedHour, selectedMinute] = selectedTime.split(":").map(Number);

    const start = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;
    const selected = selectedHour * 60 + selectedMinute;

    if (selected < start || selected > end) {
        setError("Selected time is not within doctor's working hours.");
        toast.error("Selected time is not within doctor's working hours.");
        return;
    }
    setLoading(true);
    setError("");
    if (!form.patient.name || !form.patient.email || !form.patient.phone) {
      setLoading(false);
      setError("Please fill in all required fields.");
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const res = await appAxios.post("/reservations", {...form, doctor: doctor._id });
      setForm({
        patient: { name: "", email: "", phone: "" },
        date: "",
        time: "",
        notes: "",
      });
      if (res.data.status === "success") {
        toast.success("Reservation successful!");
              setShowPopUp(false);
      setLoading(false);
    return  
    }
    else {
        toast.error("Reservation faild!");
      }


    } catch (err) {
      setLoading(false);
      setError(err.message);
        toast.error("Reservation faild!");

    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setShowPopUp(false)}
      className="reservation-modal"
      overlayClassName="reservation-overlay"
    >
      <h2>Reserve an Appointment</h2>
      <form onSubmit={handleSubmit} className="reservation-form">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.patient.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.patient.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone
          <input
            type="tel"
            name="phone"
            value={form.patient.phone}
            onChange={handleChange}
            required
          />
        </label>
        <div className="date-time">
          <label>
            Date
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Time
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <label>
          Notes
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Optional"
          />
        </label>
        {error && <div className="reservation-error">{error}</div>}
        <div className="reservation-actions">
          <button
            type="button"
            onClick={() => setShowPopUp(false)}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Reserving..." : "Reserve"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ReservationPopUp;
