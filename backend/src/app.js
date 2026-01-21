require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");

const app = express();

//to allow frontend requests
app.use(cors());

//Parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running with cors");
});

app.use("/api/users", require("./routes/User.routes.js"));
app.use("/api/reservations", require("./routes/reservation.routes.js"));
app.use("/api/events", require("./routes/events.routes.js"));
app.use("/api/reviews", require("./routes/review.routes.js"));
app.use("/api/menu", require("./routes/menu.routes.js"));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
connectDB();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server starting at port ${port}`);
});
