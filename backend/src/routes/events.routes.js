const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const adminMiddleware = require("../middlewares/adminMiddleware.js");
const Event = require("../models/Event.js");
const uploadEventImage = require("../middlewares/upload.Event.js");
const {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
  registerForEvent,
  getRemainingSpots,
  cancelEventRegistration,
  getMyEvents,
  updateEvent,
} = require("../controllers/event.controller.js");

router.get("/", getAllEvents); //can be used for Events page
router.get("/user/my-events", authMiddleware, getMyEvents);
router.get("/:id/remaining-spots", getRemainingSpots);
router.get("/:id", getEventById); //view details page

router.post("/:id/register", authMiddleware, registerForEvent);

router.delete("/:id/register", authMiddleware, cancelEventRegistration);

router.post(
  "/",
  authMiddleware,
  adminMiddleware("admin"),
  uploadEventImage.single("image"),
  createEvent,
);
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware("admin"),
  uploadEventImage.single("image"),
  updateEvent,
);
router.delete("/:id", authMiddleware, adminMiddleware("admin"), deleteEvent);

module.exports = router;
