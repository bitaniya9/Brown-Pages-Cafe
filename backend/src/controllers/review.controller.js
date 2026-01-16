const Review = require("../models/Review");
const createReview = async (request, response) => {
  try {
    const review = await Review.create({
      userId: request.user.id,
      rating: request.body.rating,
      comment: request.body.comment,
    });
    response
      .status(201)
      .json({ message: "Review created successfully", review });
  } catch (error) {
    if (error.code === 11000) {
      return response.status(400).json({ message: "You already reviewed" });
    }
    response.status(400).json({ message: error.message });
  }
};
const getAllReviews = async (request, response) => {
  try {
    const { page = 1, limit = 10 } = request.query;
    const skip = (page - 1) * limit;

    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    const total = await Review.countDocuments();

    response.json({
      reviews,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
const updateReview = async (request, response) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: request.params.id, userId: request.user.id },
      request.body,
      { new: true }
    );
    if (!review) {
      return response.status(404).json({ message: "Review not found" });
    }
    response.json(review);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

const deleteReview = async (request, response) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: request.params.id,
      userId: request.user.id,
    });
    if (!review) {
      return response.status(404).json({ message: "Review not found" });
    }
    response.status(200).json({ message: "Review deleted" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { createReview, updateReview, deleteReview, getAllReviews };
