const authorizeRoles = (...roles) => {
  return (request, response, next) => {
    if (!request.user) return response.sendStatus(401);
    if (!roles.includes(request.user.role)) return response.sendStatus(403);
    next();
  };
};
module.export = authorizeRoles;
