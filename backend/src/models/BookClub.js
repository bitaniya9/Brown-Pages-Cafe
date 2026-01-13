const mongoose = require("mongoose");

const bookClubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    currentBook: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("BookClub", bookClubSchema);
