const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resourceId: {
      //for reserving the reading space as well the cafes main area
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    resourceType: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      enum: ["morning", "afternoon", "evening"],
      required: true,
    },
    guests: {
      type: Number,
      min: 1,
      default: 1,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "completed"],
      default: "active",
    },
  },
  { timestamps: true }
);
reservationSchema.index(
  { userId: 1, resourceId: 1, date: 1, timeSlot: 1 },
  { unique: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
