const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  createReservation,
  getMyReservation,
  cancelReservation,
} = require("../controllers/reservation.controller.js");

router.post("/", authMiddleware, createReservation);
router.get("/", authMiddleware, getMyReservation);
router.patch("/:id/cancel", authMiddleware, cancelReservation);
module.exports = router;
