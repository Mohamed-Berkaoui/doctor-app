const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const reservationController = require("../controllers/reservation");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.post("/", asyncHandler(reservationController.createReservation));

router.use(asyncHandler(verifyToken()));  
router.get("/", asyncHandler(reservationController.getAllReservations));

router.get("/:id", asyncHandler(reservationController.getReservationById));

router.patch("/:id", asyncHandler(reservationController.updateReservation));

// router.delete('/:id', asyncHandler(reservationController.deleteReservation));

module.exports = router;
