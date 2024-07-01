import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { Project } from "../models/models.project.js";
import { ProjectReport } from "../models/models.projectReport.js";
import { LeaveReport } from "../models/models.leaveReport.js";
import { EmployeeSalary } from "../models/models.EmployeeSalaree.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    //console.log(userId);
    const userInstance = await User.findById(userId);
    //console.log(userInstance);
    const accessToken = await userInstance.generateAccessToken();
    const refreshToken = await userInstance.generateSessionToken();
    userInstance.refreshToken = refreshToken;
    userInstance.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(400, "something went wrong while generating the tokens");
  }
};

// const registerUser = async (req, res, next) => {
//   try {
//     await res.status(200).json({
//       message: "OK",
//     });
//   } catch (error) {
//     console.log("error", error);
//   }
// };

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    throw new ApiError(400, "username is required");
  }
  if (!password) {
    throw new ApiError(400, "password is required");
  }

  const existedUser = await User.findOne({ username });
  if (!existedUser) {
    throw new ApiError(404, "you are not registered yet");
  }

  const isPasswordValid = await existedUser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(404, "invalid user credentials");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(existedUser._id);

  //const accessToken = existedUser.generateAccessToken();

  const options = {
    httpOnly: true,
    secure: true, // Ensure this is true if using HTTPS
    sameSite: "None",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: existedUser, accessToken },
        "user logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  //console.log(req.user);
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );
  const options = {
    path: "/",
    secure: true,
    sameSite: "None",
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
  // .json({
  //   tokens: { accessToken, refreshToken },
  // });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken != user?.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired or used");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newRefreshToken } =
      await generateAccessTokenAndRefreshToken(user?._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});

const addProjectReport = asyncHandler(async (req, res) => {
  const { project, report } = req.body;
  if (!project) throw new ApiError(400, "project is required");
  if (!report) throw new ApiError(400, "report is required");
  const newReport = await ProjectReport.create({
    report,
    project,
    user: req.user.username,
  });
  if (!newReport) throw new ApiError(500, "Internal server error");
  return res.status(200).json({ message: "report submitted successfully" });
});

const addLeaveReport = asyncHandler(async (req, res) => {
  const { fromDate, toDate, reason, status } = req.body;
  if (!fromDate) throw new ApiError(400, "From Date is a required field");
  if (!toDate) throw new ApiError(400, "From Date is a required field");
  if (!reason) throw new ApiError(400, "From Date is a required field");
  const newLeave = await LeaveReport.create({
    fromDate,
    toDate,
    reason,
    status,
    user: req.user.username,
  });
  if (!newLeave) throw new ApiError(500, "Internal server error");
  return res.status(200).json({ Leave: newLeave });
});

const getSalareeDetails = asyncHandler(async (req, res) => {
  //console.log("nikhil");
  const user = req.user;
  const username = user.username;
  //console.log(user);
  const salarees = await EmployeeSalary.find({ user: username });
  //console.log(salarees);
  if (!salarees) throw new ApiError(400, "salarees not found");
  return res.status(200).json({ salarees: salarees });
});

const getProjectDetails = async (req, res) => {
  try {
    const username = req.user.username;
    const projects = await Project.find({ projectManager: username });
    if (!projects) res.status(400).json({ message: "projects not found" });

    res.status(200).json({ projects: projects });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const getLeaveDetails = asyncHandler(async (req, res) => {
  const username = req.user.username;
  //console.log(userId);
  const leaves = await LeaveReport.find({ user: username });
  if (!leaves) throw new ApiError(400, "leaves not found");
  return res.status(200).json({ leaves: leaves });
});

const getProjectReportDetails = asyncHandler(async (req, res) => {
  const user = req.user;
  //console.log(userId);
  const reports = await ProjectReport.find({ user });
  if (!reports) throw new ApiError(400, "reports not found");
  return res.status(200).json({ reports: reports });
});

const getUserDetails = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) return res.status(400).json({ message: "user not found" });
    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  refreshAccessToken,
  loginUser,
  logoutUser,
  addProjectReport,
  addLeaveReport,
  getSalareeDetails,
  getProjectDetails,
  getLeaveDetails,
  getProjectReportDetails,
  getUserDetails,
};
