import { Router } from "express";
import {
  addLeaveReport,
  addProjectReport,
  getLeaveDetails,
  getProjectDetails,
  getProjectReportDetails,
  getSalareeDetails,
  getUserDetails,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { loginRateLimit } from "../middlewares/rateLimit.js";

const router = Router();
router.route("/login").post(loginRateLimit, loginUser);
//secured routes
router.route("/logout").post(verifyJwt, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);
router.route("/addProjectReport").post(verifyJwt, addProjectReport);
router.route("/addLeaveReport").post(verifyJwt, addLeaveReport);
router.route("/getSalareeDetails").get(verifyJwt, getSalareeDetails);
router.route("/getProjectDetails").get(verifyJwt, getProjectDetails);
router.route("/getLeaveDetails").get(verifyJwt, getLeaveDetails);
router.route("/getUserDetails").get(verifyJwt, getUserDetails);
router
  .route("/getProjectReportDetails")
  .get(verifyJwt, getProjectReportDetails);

export default router;
