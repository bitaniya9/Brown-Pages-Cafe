const jwt = require("jsonwebtoken");

const authMiddleware = (request, response, next) => {
  const authHeader = request.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) return response.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //payload
    request.user = decoded;
    next();
  } catch {
    response.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
