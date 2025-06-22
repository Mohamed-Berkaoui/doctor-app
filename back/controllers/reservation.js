const Reservation = require("../models/reservation");
const AppFail = require("../utils/appFail");
const AppSuccess = require("../utils/appSuccess");
const MailService = require("../services/notifications");
const User = require("../models/user");

exports.createReservation = async (req, res) => {
  const { doctor, patient, date, time, status, notes } = req.body;

  if (
    !doctor ||
    !date ||
    !time ||
    !patient ||
    !patient.name ||
    !patient.email ||
    !patient.phone
  ) {
    return res.status(400).json(new AppFail("Patient details are incomplete"));
  }

  const existDoctor = await User.findById(doctor);
  if (!existDoctor) {
    return res.status(404).json(new AppFail("Doctor not found"));
  }

  const reservation = new Reservation({
    doctor,
    patient,
    date,
    time,
    status,
    notes,
  });

  await reservation.save();
  MailService.sendNewReservationToDoctor(
    existDoctor.email,
` Patient: ${patient.name} | (${patient.email}) 
| Phone: ${patient.phone} 
| Notes: ${notes || "None"} 
| Date: ${new Date(date).toISOString().split("T")[0]} 
| Time: ${time} 
  `
  );
  res.status(201).json(new AppSuccess(reservation));
};

exports.getAllReservations = async (req, res) => {
  const doctorId = req.user && req.user._id;
  if (!doctorId) {
    return res.status(401).json(new AppFail("Unauthorized access"));
  }

  const reservations = await Reservation.find({ doctor: doctorId });
  res.json(new AppSuccess(reservations));
};

exports.getReservationById = async (req, res) => {
  const doctorId = req.user && req.user._id;
  if (!doctorId) {
    return res.status(401).json(new AppFail("Unauthorized access"));
  }
  const reservation = await Reservation.findOne({
    _id: req.params.id,
    doctor: doctorId,
  });
  if (!reservation)
    return res.status(404).json(new AppFail("Reservation not found"));
  res.json(new AppSuccess(reservation));
};

exports.updateReservation = async (req, res) => {
  const doctorId = req.user && req.user._id;
  if (!doctorId) {
    return res.status(401).json(new AppFail("Unauthorized access"));
  }
  const { status } = req.body;
  if (typeof status === "undefined") {
    return res.status(400).json(new AppFail("Status is required"));
  }
  const reservation = await Reservation.findOneAndUpdate(
    { _id: req.params.id, doctor: doctorId },
    { status },
    { new: true, runValidators: true }
  );
  if (!reservation)
    return res.status(404).json(new AppFail("Reservation not found"));
  // Send notification to patient about status change
  MailService.sendStatusChangeToPatient(reservation.patient.email, status);
  res.json(new AppSuccess(reservation));
};

// exports.deleteReservation = async (req, res) => {
//     const doctorId = req.user && req.user._id;
//     if (!doctorId) {
//         return res.status(401).json(new AppFail("Unauthorized access"));
//     }
//     const reservation = await Reservation.findOneAndDelete({
//         _id: req.params.id,
//         doctor: doctorId,
//     });
//     if (!reservation)
//         return res.status(404).json(new AppFail("Reservation not found"));
//     res.json(new AppSuccess({ message: "Reservation deleted" }));
// };
