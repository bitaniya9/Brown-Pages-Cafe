require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");

const app = express();

//to allow frontend requests
app.use(cors());

//Parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running with cors");
});

connectDB();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server starting at port ${port}`);
});
