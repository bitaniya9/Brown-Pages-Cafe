// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleware.js");
// const adminMiddleware = require("../middlewares/adminMiddleware.js");
// const {
//   createReservation,
//   getAllReservations,
//   cancelReservation,
// } = require("../controllers/reservation.controller.js");

// router.post("/", authMiddleware, createReservation);
// router.get("/", authMiddleware, adminMiddleware, getAllReservations);
// router.patch("/:id/cancel", authMiddleware, cancelReservation);
// module.exports = router;

const Reservation = require("../models/Reservation.js");
const jwt = require("jsonwebtoken");

//function to help send JSON responses
const sendJSON = (response, statusCode, data) => {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(data));
};

//auth
const verifyAuth = (request) => {
  const token = request.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const handleReservationRoutes = async (request, response, body, path) => {
  const method = request.method;

  //verify user
  const decodedUser = verifyAuth(request);
  if (!decodedUser) {
    return sendJSON(response, 401, {
      message: "Unauthorized: No token provided",
    });
  }
  request.user = decodedUser;

  //create reservation only logged in user

  if (path === "/api/reservations" && method === "POST") {
    const { resourceType, table, date, timeSlot, guests } = body;

    if (!resourceType || !table || !date || !timeSlot) {
      return sendJSON(response, 400, { message: "Missing required fields" });
    }

    const existing = await Reservation.findOne({
      resourceId: table,
      date,
      timeSlot,
      status: "active", //check status enum in models
    });
    if (existing) {
      return sendJSON(response, 400, { message: "Already reserved spot" });
    }
    const reservation = await Reservation.create({
      userId: request.user.id,
      resourceId: table,
      resourceType,
      table,
      date,
      timeSlot,
      guests: guests || 1,
      status: "active",
    });
    return sendJSON(response, 201, reservation);
  }

  //Get reservation for admin only

  if (path === "/api/reservations" && method === "GET") {
    if (request.user.role !== "admin") {
      return sendJSON(response, 403, { message: "Access denied" });
    }
    const reservations = await Reservation.find({
      status: { $ne: "cancelled" },
    })
      .populate("userId", "name email")
      .populate("resourceId");
    return sendJSON(response, 200, reservations);
  }

  //Cancel reservation
  const cancelMatch = path.match(
    /^\/api\/reservations\/([a-zA-Z0-9]+)\/cancel$/,
  );
  if (cancelMatch && method === "PATCH") {
    const reservationId = cancelMatch[1];
    const reservation = await Reservation.findOneAndUpdate(
      {
        _id: reservationId,
        userId: request.user.id,
        status: "active",
      },
      { status: "cancelled" },
      { new: true },
    );
    if (!reservation) {
      return sendJSON(response, 404, {
        message: "Reservation not found or already cancelled",
      });
    }
    return sendJSON(response, 200, {
      message: "Reservation cancelled",
      reservation,
    });
  }
  sendJSON(response, 404, { message: "Reservation route not found" });
};

module.exports = handleReservationRoutes;
