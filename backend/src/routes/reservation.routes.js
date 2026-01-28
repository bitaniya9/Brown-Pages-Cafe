const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const adminMiddleware = require("../middlewares/adminMiddleware.js");
const {
  createReservation,
  getAllReservations,
  cancelReservation,
} = require("../controllers/reservation.controller.js");

router.post("/", authMiddleware, createReservation);
router.get("/", authMiddleware, adminMiddleware, getAllReservations);
router.patch("/:id/cancel", authMiddleware, cancelReservation);
module.exports = router;
