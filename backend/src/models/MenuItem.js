const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: {
    type: String,
    enum: [
      "sandwiches_and_snacks",
      "pasteries",
      "specials",
      "hot_drinks",
      "cold_drinks",
      "juice",
    ],
  },
  available: {
    type: Boolean,
    default: true,
  },
  image: { type: String },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
