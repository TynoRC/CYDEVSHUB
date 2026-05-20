function adminMiddleware(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Acces interzis. Ai nevoie de rol ADMIN.",
    });
  }

  next();
}

module.exports = adminMiddleware;