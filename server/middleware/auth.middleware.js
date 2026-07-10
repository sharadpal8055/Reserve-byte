import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";

import asyncHandler from "../utils/asyncHandler.js";

// ========================
// VERIFY JWT TOKEN
// ========================

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // cookie token

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // bearer token
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Not authorized login required");
  }

  const decoded = jwt.verify(
    token,

    process.env.JWT_SECRET,
  );

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(
      401,

      "User not found",
    );
  }

  req.user = user;

  next();
});

// ========================
// ROLE AUTHORIZATION
// ========================

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,

        "Access denied",
      );
    }

    next();
  };
};
