const User = require("../models/User");
const bcrypt = require("bcrypt");
// const { request } = require("express");
const jwt = require("jsonwebtoken");

const signup = async (request, response) => {
  const { name, email, password, role } = request.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return response.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  response.status(201).json({
    message: "User registered",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

const login = async (request, response) => {
  const { email, password } = request.body || {};
  console.log("Request body:", request.body);

  if (!email || !password) {
    return response
      .status(400)
      .json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  console.log("Any user in DB:", user);
  if (!user || !user.password) {
    return response.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return response.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  response.json({ token });
};

module.exports = { signup, login };
