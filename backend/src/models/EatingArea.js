const mongoose = require("mongoose");

const eatingAreaSchema = new mongoose.Schema({
  name: String,
  seats: Number,
});

module.exports = mongoose.model("EatingArea", eatingAreaSchema);
