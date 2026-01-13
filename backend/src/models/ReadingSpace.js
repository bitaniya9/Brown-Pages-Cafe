const mongoose = require("mongoose");

const readingSpaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["window_seat", "cozy_nook", "group_table"],
      required: true,
    },
    seats: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ReadingSpace", readingSpaceSchema);
