const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const reservationSchema = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        patient: {
            type: patientSchema,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        },
        notes: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("reservation", reservationSchema);
