//This will connect Event and Users

const mongoose = require("mongoose");

const EventRegistrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  { timestamps: true }
);
//No two registration for the same event(compound index)
EventRegistrationSchema.index({ userId: 1, eventId: 1 }, { unique: true });
module.exports = mongoose.model("EventRegistration", EventRegistrationSchema);
