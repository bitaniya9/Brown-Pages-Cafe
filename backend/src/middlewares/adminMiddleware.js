const adminMiddleware = (...roles) => {
  return (request, response, next) => {
    if (!request.user) return response.sendStatus(401);
    if (!roles.includes(request.user.role)) return response.sendStatus(403);
    console.log("USER FROM TOKEN:", request.user);

    next();
  };
};
module.exports = adminMiddleware;
