function developerMiddleware(req, res, next) {
  if (req.user.role !== "DEVELOPER" && req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Acces interzis. Ai nevoie de rol DEVELOPER.",
    });
  }

  next();
}

module.exports = developerMiddleware;