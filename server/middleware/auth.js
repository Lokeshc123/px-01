const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");

const isVerified = async (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.token_auth;
  console.log(token);
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

module.exports = {
  isVerified,
  authorizeRoles,
};
