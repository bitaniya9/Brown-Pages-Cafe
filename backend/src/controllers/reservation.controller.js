const Reservation = require("../models/Reservation.js");

const createReservation = async (request, response) => {
  console.log("Headers:", request.headers["content-type"]);
  console.log("Body:", request.body);
  const { resourceId, resourceType, date, timeSlot, guests } =
    request.body || {};
  if (!resourceId || !resourceType || !date || !timeSlot) {
    return response.status(400).json({
      message: "Missing required reservation fields",
    });
  }

  try {
    const exisiting = await Reservation.findOne({
      resourceId,
      resourceType,
      date,
      timeSlot,
      status: "active",
    });
    if (exisiting) {
      return response.status(400).json({ message: "Already reserved spot" });
    }
    const reservation = await Reservation.create({
      userId: request.user.id,
      resourceId,
      resourceType,
      date,
      timeSlot,
      guests: guests || 1,
      status: "active",
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
      status: { $ne: "cancelled" },
    }).populate("resourceId");

    response.json(reservations);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//Cancel reservation
const cancelReservation = async (request, response) => {
  try {
    const reservation = await Reservation.findOneAndUpdate(
      {
        _id: request.params.id,
        userId: request.user.id,
        status: "active",
      },
      { status: "cancelled" },
      { new: true }
    );
    if (!reservation) {
      return response
        .status(404)
        .json({ message: "Reservation not found or already cancelled" });
    }
    response.json({ message: "Reservation canceled", reservation });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { createReservation, getMyReservation, cancelReservation };
