//connecting with mongo

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    console.log("connection url", process.env.MONGO_URI);
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected");
  } catch (error) {
    console.log("Error when connectiong to mongodb");
  }
};

module.exports = connectDB;
