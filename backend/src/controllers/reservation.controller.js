const Reservation = require("../models/Reservation.js");

const createReservation = async (request, response) => {
  const { resourceId, resourceType, date, timeSlot } = request.body;
  try {
    const reservation = await Reservation.create({
      userId: request.user.id,
      resourceId,
      resourceType,
      date,
      timeSlot,
    });
    response.status(201).json(reservation);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};
//Get reservation
const getMyReservation = async (request, response) => {
  try {
    const reservations = await Reservation.find({
      userId: request.user.id,
    }).populate("resourceId");

    response.json(reservations);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//Cancel reservation
const cancelReservation = async (request, response) => {
  try {
    const reservation = await Reservation.findOneAndDelete({
      _id: request.params.id,
      userId: request.user.id,
    });
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    response.json({ message: "Reservation canceled" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { createReservation, getMyReservation, cancelReservation };
