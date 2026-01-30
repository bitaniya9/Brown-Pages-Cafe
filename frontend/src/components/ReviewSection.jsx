import React, { useState, useEffect } from "react";
import { createReview, getAllReviewsAdmin } from "../api"; // Adjust path
import { toast } from "react-toastify";

const ReviewSection = ({ token }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  // 1. Fetch reviews on load
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviewsAdmin(1, 10);
        setReviews(data.reviews);
      } catch (error) {
        console.error("Failed to load reviews", error.message);
      }
    };
    fetchReviews();
  }, []);

  // 2. Handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createReview(token, { rating, comment });
      return toast.info("Thank you for your review!");
    } catch (err) {
      setError(err.message); // This catches "You already sent the review"
    }
  };

  return (
    <div className="review-container">
      <hr />
      <h3>Guest Reviews</h3>

      {/* Submission Form - Only show if user is logged in */}
      {token ? (
        <form onSubmit={handleSubmit} className="review-form">
          <h4>Leave a Review</h4>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            {[5, 4, 3, 2, 1].map((num) => (
              <option key={num} value={num}>
                {num} Stars
              </option>
            ))}
          </select>

          <textarea
            placeholder="Tell us about your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button type="submit" class="submit-btn">
            Post Review
          </button>
        </form>
      ) : (
        <p>Please log in to leave a review.</p>
      )}
    </div>
  );
};

export default ReviewSection;
