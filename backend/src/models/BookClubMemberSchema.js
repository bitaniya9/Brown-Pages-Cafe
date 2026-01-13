const mongoose = require("mongoose");
//many to many realtions
const bookClubMemeberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookClubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookClub",
      required: true,
    },
  },
  { timestamps: true }
);
bookClubMemeberSchema.index({ userId: 1, bookClubId: 1 }, { unique: true });

module.exports = mongoose.model("BookClubMember", bookClubMemeberSchema);
