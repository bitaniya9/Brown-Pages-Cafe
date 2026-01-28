const mongoose = require("mongoose");
const { READING_TABLES, EATING_TABLES } = require("../utils/tableEnums");

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resourceId: {
      type: String, // same as table
      required: true,
    },
    resourceType: {
      type: String,
      enum: ["reading", "eating"],
      required: true,
    },
    table: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const tables =
            this.resourceType === "reading"
              ? Object.keys(READING_TABLES)
              : Object.keys(EATING_TABLES);
          return tables.includes(value);
        },
        message: "Invalid table for selected resource type",
      },
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
  { timestamps: true },
);

// Correct uniqueness
reservationSchema.index(
  { resourceId: 1, date: 1, timeSlot: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "active" },
  },
);

module.exports = mongoose.model("Reservation", reservationSchema);
