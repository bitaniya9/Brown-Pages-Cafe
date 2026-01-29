const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sendJSON = (response, statusCode, data) => {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(data));
};
const handleUserRoutes = async (request, response, body, path) => {
  if (path === "/api/users/signup" && request.method === "POST") {
    const { name, email, password, role } = body;
    if (!name || !email || !password) {
      return sendJSON(response, 400, { message: "Missing required fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendJSON(response, 400, { message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return sendJSON(response, 201, {
      message: "User registered",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
  //Path for login
  if (path === "/api/users/login" && request.method === "POST") {
    const { email, password } = body;

    if (!email || !password) {
      return sendJSON(response, 400, {
        message: "Email and password are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return sendJSON(response, 400, { message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return sendJSON(response, 400, { message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    return sendJSON(response, 200, { token });
  }
  sendJSON(response, 404, { message: "User route not found" });
};
module.exports = handleUserRoutes;
