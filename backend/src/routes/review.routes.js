require("dotenv").config({ path: "../.env" });
const Review = require("../models/Review");
const jwt = require("jsonwebtoken");

const sendJSON = (response, statusCode, data) => {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(data));
};
const verifyAuth = (request) => {
  const token = request.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET); //check this
  } catch (error) {
    return null;
  }
};
const handleReviewRoutes = async (request, response, body, path, query) => {
  const method = request.method;

  const decodedUser = verifyAuth(request);
  if (!decodedUser) {
    return sendJSON(response, 401, { message: "Unauthorized" });
  }
  request.user = decodedUser;

  if (path === "/api/reviews" && method === "POST") {
    try {
      const review = await Review.create({
        userId: request.user.id,
        rating: body.rating,
        comment: body.comment,
      });
      return sendJSON(response, 201, {
        message: "Review has been created",
        review,
      });
    } catch (error) {
      if (error.code === 11000) {
        return sendJSON(response, 400, {
          message: "You already sent the review",
        });
      }
      return sendJSON(response, 400, { message: error.message });
    }
  }

  //get all reviews
  if (path === "/api/reviews/admin" && method === "GET") {
    if (request.user.role !== "admin") {
      return sendJSON(response, 403, { message: "Access denied" });
    }

    try {
      const reviews = await Review.find()
        .sort({ createdAt: -1 })
        .populate("userId", "name email");

      return sendJSON(response, 200, {
        reviews,
      });
    } catch (error) {
      return sendJSON(response, 500, { message: error.message });
    }
  }
  // Fallback
  sendJSON(response, 404, { message: "Review route not found" });
};

module.exports = handleReviewRoutes;
