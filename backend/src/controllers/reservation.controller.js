const Reservation = require("../models/Reservation.js");

// CREATE RESERVATION
const createReservation = async (req, res) => {
  const { resourceType, table, date, timeSlot, guests } = req.body || {};

  if (!resourceType || !table || !date || !timeSlot) {
    return res.status(400).json({
      message: "Missing required reservation fields",
    });
  }

  try {
    const existing = await Reservation.findOne({
      resourceId: table,
      date,
      timeSlot,
      status: "active",
    });

    if (existing) {
      return res.status(400).json({
        message: "Already reserved spot",
      });
    }

    const reservation = await Reservation.create({
      userId: req.user.id,
      resourceId: table,
      resourceType,
      table,
      date,
      timeSlot,
      guests: guests || 1,
      status: "active",
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET MY RESERVATIONS
const getMyReservation = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      userId: req.user.id,
      status: { $ne: "cancelled" },
    });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CANCEL RESERVATION
const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
        status: "active",
      },
      { status: "cancelled" },
      { new: true },
    );

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found or already cancelled",
      });
    }

    res.json({
      message: "Reservation canceled",
      reservation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReservation,
  getMyReservation,
  cancelReservation,
};
