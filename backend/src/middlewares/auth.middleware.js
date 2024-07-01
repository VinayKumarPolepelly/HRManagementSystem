import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// Middleware to verify JWT
export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    //console.log("Token received:", token); // Log the token

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const loggedInUser = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!loggedInUser) {
      throw new ApiError(400, "Invalid access token");
    }

    req.user = loggedInUser;
    next();
  } catch (error) {
    //console.error("Error verifying JWT:", error);
    throw new ApiError(401, error.message || "Invalid access token");
  }
});

export const verifyAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).send("Forbidden, you are not authorized");
  }
  next();
};
