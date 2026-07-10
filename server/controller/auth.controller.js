import User from "../models/user.model.js";

import generateToken from "../utils/generateToken.js";

import asyncHandler from "../utils/asyncHandler.js";

import ApiError from "../utils/ApiError.js";

// =======================
// REGISTER USER
// =======================

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check existing user

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  // create user

  const user = await User.create({
    name,
    email,
    password,
  });

  // generate jwt

  const token = generateToken(user);

  // store token in cookie

 res.cookie(
  "token",
  token,
  {
    httpOnly:true,

    secure:true,

    sameSite:"none",

    maxAge:7 * 24 * 60 * 60 * 1000
  }
);

  res.status(201).json({
    success: true,

    user: {
      id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,
    },
  });
});

// =======================
// LOGIN USER
// =======================

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user);

  res.cookie(
    "token",

    token,

    {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: "strict",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  );

  res.json({
    success: true,

    user: {
      id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,
    },
  });
});

// =======================
// LOGOUT
// =======================

export const logout = asyncHandler(async (req, res) => {
 res.clearCookie(
 "token",
 {
   httpOnly:true,
   secure:true,
   sameSite:"none"
 }
);

  res.json({
    success: true,

    message: "Logout successful",
  });
});
