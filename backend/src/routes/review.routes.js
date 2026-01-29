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
      // Manual pagination parsing from the query object
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const skip = (page - 1) * limit;

      const reviews = await Review.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Review.countDocuments();

      return sendJSON(response, 200, {
        reviews,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      return sendJSON(response, 500, { message: error.message });
    }
  }

  // Regex for /api/reviews/:id (Matches PUT and DELETE)
  const idMatch = path.match(/^\/api\/reviews\/([a-zA-Z0-9]+)$/);

  if (idMatch) {
    const reviewId = idMatch[1];

    // PUT /api/reviews/:id
    if (method === "PUT") {
      try {
        const review = await Review.findOneAndUpdate(
          { _id: reviewId, userId: request.user.id },
          body,
          { new: true },
        );
        if (!review)
          return sendJSON(response, 404, { message: "Review not found" });
        return sendJSON(response, 200, review);
      } catch (error) {
        return sendJSON(response, 400, { message: error.message });
      }
    }

    // DELETE /api/reviews/:id
    if (method === "DELETE") {
      try {
        const review = await Review.findOneAndDelete({
          _id: reviewId,
          userId: request.user.id,
        });
        if (!review)
          return sendJSON(response, 404, { message: "Review not found" });
        return sendJSON(response, 200, { message: "Review deleted" });
      } catch (error) {
        return sendJSON(response, 500, { message: error.message });
      }
    }
  }

  // Fallback
  sendJSON(response, 404, { message: "Review route not found" });
};

module.exports = handleReviewRoutes;
