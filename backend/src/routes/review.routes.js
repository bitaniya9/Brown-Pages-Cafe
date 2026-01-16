const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const adminMiddleware = require("../middlewares/adminMiddleware.js");

router.post("/", authMiddleware, createReview);
router.get("/admin", authMiddleware, adminMiddleware("admin"), getAllReviews);
router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;
