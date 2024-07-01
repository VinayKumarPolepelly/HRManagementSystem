import mongoose, { Schema, model } from "mongoose";
import { User } from "./user.model.js";
const leaveReportSchema = new Schema(
  {
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accept", "reject"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const LeaveReport = model("LeaveReports", leaveReportSchema);
