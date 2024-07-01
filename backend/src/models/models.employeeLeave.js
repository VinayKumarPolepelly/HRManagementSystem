import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";
const EmployeeAttendaneSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});
export const EmployeeLeave = mongoose.model(
  "EmployeeLeave",
  EmployeeAttendaneSchema
);
