const express = require("express");
const router = express.Router();

const {
  createMenuItem,
  getMenuItems,
} = require("../controllers/menu.controller.js");

const authMiddleware = require("../middlewares/authMiddleware.js");
const adminMiddleware = require("../middlewares/adminMiddleware.js");

router.post("/", authMiddleware, adminMiddleware, createMenuItem);

router.post("/", getMenuItems);

module.exports = router;
