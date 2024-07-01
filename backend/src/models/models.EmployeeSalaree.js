import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";
const EmployeeSalaryScheema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    salaryAmount: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const EmployeeSalary = mongoose.model(
  "EmployeeSalary",
  EmployeeSalaryScheema
);
